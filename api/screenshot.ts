import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthorized } from "../src/authorization";
import { IS_DEVELOPMENT, SELF_URL } from "../src/config";
import { imageForKindle } from "../src/forKindle";
import { getSecondsToNextUpdate } from "../src/nextUpdate";
import { takeScreenshot } from "../src/screenshot";
import { setProxyMaxAge } from "../src/vercel";

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

  const nextRefreshSeconds = getSecondsToNextUpdate();
  const nextRefreshMinutes = Math.floor(nextRefreshSeconds / 60);
  res.setHeader("X-Next-Refresh", nextRefreshMinutes);

  setProxyMaxAge(res, nextRefreshSeconds - 10);

  return res.send(forKindle);
};
