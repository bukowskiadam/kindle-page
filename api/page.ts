import type { VercelRequest, VercelResponse } from "@vercel/node";

import * as nunjucks from "nunjucks";
import { getAirlyData } from "../src/airlyCached";
import { isAuthorized } from "../src/authorization";
import { getCalendarData } from "../src/calendar";
import { TIME_ZONE } from "../src/config";
import { getSecondsToNextUpdate } from "../src/nextUpdate";
import { getRandomQuote } from "../src/quotable";
import { setProxyMaxAge } from "../src/vercel";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { battery: batteryUnsafe = "" } = req.query || {};
  const battery = Number.parseInt(batteryUnsafe.toString(), 10) || undefined;

  if (!isAuthorized(req)) {
    return res.status(401).json({ status: "no auth" });
  }

  nunjucks.configure(__dirname + "/../templates", { autoescape: true });

  const now = new Date();

  const time = now.toLocaleString("pl-PL", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = now.toLocaleString("pl-PL", {
    timeZone: TIME_ZONE,
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });

  const [calendar, quote, airly] = await Promise.all([
    getCalendarData(),
    getRandomQuote(),
    getAirlyData(),
  ]);

  const pageHtml = nunjucks.render("status-page.html", {
    time,
    date,
    battery,
    calendar,
    quote,
    airly,
  });

  const nextRefreshSeconds = getSecondsToNextUpdate();
  res.setHeader("X-Next-Refresh", nextRefreshSeconds);

  setProxyMaxAge(res, nextRefreshSeconds);

  return res.status(200).send(pageHtml);
};
