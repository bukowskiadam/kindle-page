import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fileURLToPath } from "node:url";

import nunjucks from "nunjucks";
import { getAirlyData } from "../src/airlyCached.js";
import { isAuthorized } from "../src/authorization.js";
import { getCalendarData } from "../src/calendar.js";
import { formatDate, formatTime, getNow } from "../src/date.js";
import { getRandomQuote } from "../src/quotable.js";
import {
  getCurrentRefreshSchedule,
  getDayMode,
  getNextRefreshTime,
  getSecondsToNextRefresh,
} from "../src/schedule.js";
import { setProxyMaxAge } from "../src/vercel.js";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { battery: batteryUnsafe = "" } = req.query || {};
  const battery = Number.parseInt(batteryUnsafe.toString(), 10) || undefined;

  if (!isAuthorized(req)) {
    return res.status(401).json({ status: "no auth" });
  }

  nunjucks.configure(fileURLToPath(new URL("../templates", import.meta.url)), {
    autoescape: true,
  });

  const now = getNow();

  const [{ calendar, refreshScheduleOverride }, quote, airly] =
    await Promise.all([getCalendarData(), getRandomQuote(), getAirlyData()]);

  const refreshSchedule = getCurrentRefreshSchedule(
    now,
    refreshScheduleOverride
  );
  const nextRefreshTime = getNextRefreshTime(now, refreshSchedule);
  const nextRefreshSeconds = getSecondsToNextRefresh(now, nextRefreshTime);
  const dayMode = getDayMode(now);

  const pageHtml = nunjucks.render("index.njk", {
    time: formatTime(now),
    date: formatDate(now),
    battery,
    refreshSchedule,
    nextRefreshTime: formatTime(nextRefreshTime),
    calendar,
    quote,
    airly,
    dayMode,
  });

  res.setHeader("X-Next-Refresh", nextRefreshSeconds);

  setProxyMaxAge(res, nextRefreshSeconds - 10);

  return res.status(200).send(pageHtml);
};
