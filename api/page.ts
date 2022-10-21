import type { VercelRequest, VercelResponse } from "@vercel/node";

import * as nunjucks from "nunjucks";
import { getAirlyData } from "../src/airlyCached";
import { isAuthorized } from "../src/authorization";
import { getCalendarData } from "../src/calendar";
import { formatDate, formatTime, getNow } from "../src/date";
import { getRandomQuote } from "../src/quotable";
import {
  getCurrentRefreshSchedule,
  getNextRefreshTime,
  getSecondsToNextRefresh,
} from "../src/schedule";
import { setProxyMaxAge } from "../src/vercel";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { battery: batteryUnsafe = "" } = req.query || {};
  const battery = Number.parseInt(batteryUnsafe.toString(), 10) || undefined;

  if (!isAuthorized(req)) {
    return res.status(401).json({ status: "no auth" });
  }

  nunjucks.configure(__dirname + "/../templates", { autoescape: true });

  const now = getNow();

  const [{ calendar, refreshScheduleOverride }, quote, airly] =
    await Promise.all([getCalendarData(), getRandomQuote(), getAirlyData()]);

  const refreshSchedule = getCurrentRefreshSchedule(
    now,
    refreshScheduleOverride
  );
  const nextRefreshTime = getNextRefreshTime(now, refreshSchedule);
  const nextRefreshSeconds = getSecondsToNextRefresh(now, nextRefreshTime);

  const pageHtml = nunjucks.render("status-page.html", {
    time: formatTime(now),
    date: formatDate(now),
    battery,
    refreshSchedule,
    nextRefreshTime: formatTime(nextRefreshTime),
    calendar,
    quote,
    airly,
  });

  res.setHeader("X-Next-Refresh", nextRefreshSeconds);

  setProxyMaxAge(res, nextRefreshSeconds - 10);

  return res.status(200).send(pageHtml);
};
