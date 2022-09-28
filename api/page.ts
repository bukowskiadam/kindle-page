import type { VercelRequest, VercelResponse } from "@vercel/node";

import * as nunjucks from "nunjucks";
import { getCalendarData } from "../src/calendar";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { VERCEL_ENV, AUTH_TOKEN, CALENDAR_EVENTS = "" } = process.env;
  const { auth, battery = "" } = req.query || {};

  const isDevelopment = VERCEL_ENV === "development";

  if (!isDevelopment && auth !== AUTH_TOKEN) {
    return res.status(401).json({ status: "no auth" });
  }

  nunjucks.configure(__dirname + "/../templates", { autoescape: true });

  const now = new Date();

  const time = now.toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = now.toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });

  const calendar = await getCalendarData(CALENDAR_EVENTS, isDevelopment);

  const pageHtml = nunjucks.render("status-page.html", {
    time,
    date,
    battery,
    calendar,
  });

  res.setHeader("Cache-Control", "max-age=0, s-maxage=30");

  return res.status(200).send(pageHtml);
};
