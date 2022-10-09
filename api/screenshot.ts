import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthorized } from "../src/authorization";
import { IS_DEVELOPMENT, SELF_URL } from "../src/config";
import { imageForKindle } from "../src/forKindle";
import { takeScreenshot } from "../src/screenshot";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ status: "no auth" });
  }

  const params = req.url?.split("?")[1] || "";

  const rotate = !IS_DEVELOPMENT;
  const protocol = IS_DEVELOPMENT ? "http" : "https";
  const image = await takeScreenshot(
    `${protocol}://${SELF_URL}/api/page?${params}`
  );
  const forKindle = imageForKindle(image, { rotate });

  res.setHeader("Content-Type", "image/png");

  // return number of minutes when kindle should refresh again - it does not work yet on kindle
  res.setHeader("X-Next-Refresh", "60");

  return res.send(forKindle);
};
