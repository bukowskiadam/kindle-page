import type { VercelRequest, VercelResponse } from "@vercel/node";

import { createPage } from "../src/create";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { VERCEL_ENV, AUTH_TOKEN } = process.env;
  const { auth, battery = "" } = req.query || {};

  if (VERCEL_ENV !== "development" && auth !== AUTH_TOKEN) {
    return res.status(401).json({ status: "no auth" });
  }

  const kindlePage = await createPage({
    battery: Number.parseInt(battery.toString(), 10),
    rotate: VERCEL_ENV !== "development",
  });

  res.setHeader("Content-Type", "image/png");

  return res.send(kindlePage);
};
