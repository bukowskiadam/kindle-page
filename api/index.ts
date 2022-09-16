import type { VercelRequest, VercelResponse } from "@vercel/node";

import { createPage } from "../src/create";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { auth, battery = "" } = req.query || {};

  if (auth !== "test") {
    return res.status(401).json({ status: "no auth" });
  }

  const batteryNumber = Number.parseInt(battery.toString(), 10);
  const kindlePage = await createPage(batteryNumber);

  res.setHeader("Content-Type", "image/png");

  return res.send(kindlePage);
};
