import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthorized } from "../src/authorization";
import { IS_DEVELOPMENT } from "../src/config";
import { imageForKindle } from "../src/forKindle";
import { takeScreenshot } from "../src/screenshot";
import { getSelfUrl, setProxyMaxAge } from "../src/vercel";

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

  ["x-next-refresh", "cache-control"].forEach((header) => {
    res.setHeader(header, headers[header]);
  });

  return res.send(forKindle);
};
