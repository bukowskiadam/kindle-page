import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthorized } from "../src/authorization";
import { IS_DEVELOPMENT } from "../src/config";
import { imageForKindle } from "../src/forKindle";
import { getSecondsToNextUpdate } from "../src/nextUpdate";
import { takeScreenshot } from "../src/screenshot";
import { getSelfUrl, setProxyMaxAge } from "../src/vercel";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ status: "no auth" });
  }

  const params = req.url?.split("?")[1] || "";

  const rotate = !IS_DEVELOPMENT;
  const image = await takeScreenshot(`${getSelfUrl()}/api/page?${params}`);
  const forKindle = imageForKindle(image, { rotate });

  res.setHeader("Content-Type", "image/png");

  const nextRefreshSeconds = getSecondsToNextUpdate();
  res.setHeader("X-Next-Refresh", nextRefreshSeconds);

  setProxyMaxAge(res, nextRefreshSeconds - 10);

  return res.send(forKindle);
};
