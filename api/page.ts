import type { VercelRequest, VercelResponse } from "@vercel/node";

import * as nunjucks from "nunjucks";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { VERCEL_ENV, AUTH_TOKEN } = process.env;
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
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });

  const pageHtml = nunjucks.render("status-page.html", {
    time,
    date,
    battery,
  });

  return res.send(pageHtml);
};
