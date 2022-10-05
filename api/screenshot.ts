import type { VercelRequest, VercelResponse } from "@vercel/node";
import { imageForKindle } from "../src/forKindle";
import { takeScreenshot } from "../src/screenshot";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { VERCEL_ENV, AUTH_TOKEN, VERCEL_URL } = process.env;
  const { auth = "", battery = "" } = req.query || {};

  const isDevelopment = VERCEL_ENV === "development";

  if (!isDevelopment && auth !== AUTH_TOKEN) {
    return res.status(401).json({ status: "no auth" });
  }

  const rotate = !isDevelopment;
  const protocol = isDevelopment ? "http" : "https";
  const image = await takeScreenshot(
    `${protocol}://${VERCEL_URL}/api/page?auth=${auth}&battery=${battery}`
  );
  const forKindle = imageForKindle(image, { rotate });

  res.setHeader("Content-Type", "image/png");

  // return number of minutes when kindle should refresh again - it does not work yet on kindle
  res.setHeader("X-Next-Refresh", "60");

  return res.send(forKindle);
};
