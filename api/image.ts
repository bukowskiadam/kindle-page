import type { VercelRequest, VercelResponse } from "@vercel/node";

import { isAuthorized } from "../src/authorization.js";
import { imageForKindle } from "../src/for-kindle.js";
import { getPageData, parsePageDataOptions } from "../src/page-data.js";
import { loadRenderAssets } from "../src/render/assets.js";
import {
  renderDashboardPng,
  renderDashboardSvg,
} from "../src/render/render-png.js";
import { setProxyMaxAge } from "../src/vercel.js";

/**
 * PoC replacement for /api/screenshot: renders the PNG directly
 * (satori + resvg) instead of screenshotting /api/page with Chromium.
 */
export default async (req: VercelRequest, res: VercelResponse) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ status: "no auth" });
  }

  const timer = createTimer();

  const [data, assets] = await Promise.all([
    getPageData(parsePageDataOptions(req.query)),
    loadRenderAssets(),
  ]);
  timer.mark("data");

  const svg = await renderDashboardSvg(data, assets);
  timer.mark("layout");

  const png = renderDashboardPng(svg);
  timer.mark("raster");

  const forKindle = imageForKindle(png, { rotate: false });
  timer.mark("kindle");

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Server-Timing", timer.toHeader());
  res.setHeader("x-next-refresh", data.nextRefreshSeconds);

  setProxyMaxAge(res, data.nextRefreshSeconds - 10);

  return res.send(forKindle);
};

function createTimer() {
  const marks: Array<{ name: string; durationMs: number }> = [];
  let last = performance.now();

  return {
    mark(name: string) {
      const now = performance.now();
      marks.push({ name, durationMs: now - last });
      last = now;
    },
    toHeader() {
      return marks
        .map(({ name, durationMs }) => `${name};dur=${durationMs.toFixed(1)}`)
        .join(", ");
    },
  };
}
