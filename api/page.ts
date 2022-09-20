import type { VercelRequest, VercelResponse } from "@vercel/node";

import * as nunjucks from "nunjucks";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { VERCEL_ENV, AUTH_TOKEN } = process.env;
  const { auth, battery = "" } = req.query || {};

  if (VERCEL_ENV !== "development" && auth !== AUTH_TOKEN) {
    return res.status(401).json({ status: "no auth" });
  }

  nunjucks.configure(__dirname + "/../templates", { autoescape: true });

  const pageHtml = nunjucks.render("status-page.njk", {
    battery,
  });

  return res.send(pageHtml);
};
