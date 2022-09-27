import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

import * as nunjucks from "nunjucks";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { VERCEL_ENV, AUTH_TOKEN, CALENDAR_EVENTS } = process.env;
  const { auth, battery = "" } = req.query || {};

  if (VERCEL_ENV !== "development" && auth !== AUTH_TOKEN) {
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

  const calendar =
    CALENDAR_EVENTS &&
    (await axios.get(CALENDAR_EVENTS)).data.map((row) => {
      row.day = new Date(row.day).toLocaleString("pl-PL", {
        timeZone: "Europe/Warsaw",
        weekday: "long",
        month: "numeric",
        day: "numeric",
      });

      row.time.forEach((ev) => {
        ev.start = new Date(ev.start).toLocaleString("pl-PL", {
          timeZone: "Europe/Warsaw",
          hour: "2-digit",
          minute: "2-digit",
        });
        ev.end = new Date(ev.end).toLocaleString("pl-PL", {
          timeZone: "Europe/Warsaw",
          hour: "2-digit",
          minute: "2-digit",
        });
      });

      return row;
    });

  const pageHtml = nunjucks.render("status-page.html", {
    time,
    date,
    battery,
    calendar,
  });

  return res.send(pageHtml);
};
