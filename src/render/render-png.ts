import satori from "satori";

import type { PageData } from "../page-data.ts";
import type { RenderAssets } from "./assets.ts";
import { Dashboard } from "./components/dashboard.ts";
import { loadFonts, svgToPng } from "./rasterize.ts";
import { PAGE_HEIGHT, PAGE_WIDTH } from "./theme.ts";

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
