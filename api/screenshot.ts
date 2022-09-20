import type { VercelRequest, VercelResponse } from "@vercel/node";
import { imageForKindle } from "../src/forKindle";
import { takeScreenshot } from "../src/screenshot";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { VERCEL_ENV, AUTH_TOKEN } = process.env;
  const { auth } = req.query || {};

  if (VERCEL_ENV !== "development" && auth !== AUTH_TOKEN) {
    return res.status(401).json({ status: "no auth" });
  }

  const rotate = VERCEL_ENV !== "development";
  const image = await takeScreenshot(
    "https://weather.com/pl-PL/pogoda/dzisiaj/l/e5137ad59d68e86155f4cf59f3f44bb5e7bfe3b64adb102d1e81c677e3bb3ec3"
  );
  const forKindle = imageForKindle(image, { rotate });

  res.setHeader("Content-Type", "image/png");

  return res.send(forKindle);
};
