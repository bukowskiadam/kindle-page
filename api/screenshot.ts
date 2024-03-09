import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthorized } from "../src/authorization.js";
import { IS_DEVELOPMENT } from "../src/config.js";
import { imageForKindle } from "../src/for-kindle.js";
import { takeScreenshot } from "../src/screenshot.js";
import { getSelfUrl, setProxyMaxAge } from "../src/vercel.js";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ status: "no auth" });
  }

  const params = req.url?.split("?")[1] || "";

  const rotate = !IS_DEVELOPMENT;
  const { screenshot, headers } = await takeScreenshot(
    `${getSelfUrl()}/api/page?${params}`
  );
  const forKindle = imageForKindle(screenshot, { rotate });

  res.setHeader("Content-Type", "image/png");

  const nextRefresh = Number.parseInt(headers["x-next-refresh"], 10) || 15 * 60;
  res.setHeader("x-next-refresh", nextRefresh);

  setProxyMaxAge(res, nextRefresh - 10);

  return res.send(forKindle);
};
