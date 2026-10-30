import satori from "satori";

import type { PageData } from "../page-data.js";
import type { RenderAssets } from "./assets.js";
import { Dashboard } from "./components/dashboard.js";
import { loadFonts, svgToPng } from "./rasterize.js";
import { PAGE_HEIGHT, PAGE_WIDTH } from "./theme.js";

export async function renderDashboardSvg(
  data: PageData,
  assets: RenderAssets
): Promise<string> {
  return satori(Dashboard({ data, assets }), {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    fonts: await loadFonts(),
  });
}

export function renderDashboardPng(svg: string): Buffer {
  return svgToPng(svg, PAGE_WIDTH);
}
