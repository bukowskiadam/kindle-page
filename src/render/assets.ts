import axios from "axios";

import { svgToPng } from "./rasterize.js";
import { PAGE_WIDTH } from "./theme.js";

const METEOGRAM_URL = "https://www.yr.no/en/content/2-3094802/meteogram.svg";
const AIRLY_LOGO_URL =
  "https://cdn.airly.org/assets/brand/logo/primary/airly.svg";

/** Part of the meteogram shown on the page (skips the header and legend). */
export const METEOGRAM_CROP = {
  x: 0.3,
  y: 111.756,
  width: PAGE_WIDTH,
  height: 149,
} as const;

/** Browsers resolve `rem` inside SVG images against the default 16px root font size. */
const BROWSER_ROOT_FONT_SIZE_PX = 16;

export type RenderAssets = {
  meteogramDataUri: string;
  airlyLogoDataUri: string;
};

export async function loadRenderAssets(): Promise<RenderAssets> {
  const [meteogram, airlyLogo] = await Promise.all([
    fetchText(METEOGRAM_URL),
    fetchText(AIRLY_LOGO_URL),
  ]);

  const meteogramPng = svgToPng(prepareMeteogram(meteogram), METEOGRAM_CROP.width);

  return {
    meteogramDataUri: toDataUri("image/png", meteogramPng),
    airlyLogoDataUri: toDataUri("image/svg+xml", Buffer.from(airlyLogo)),
  };
}

async function fetchText(url: string): Promise<string> {
  const { data } = await axios.get<string>(url, { responseType: "text" });
  return data;
}

/**
 * Makes the yr.no SVG renderable by resvg and crops it to the visible part:
 * - drops the external stylesheet reference (resvg does not fetch it),
 * - converts `rem` units to px,
 * - replaces the root size and viewBox with the crop window.
 */
export function prepareMeteogram(svg: string): string {
  const { x, y, width, height } = METEOGRAM_CROP;

  return svg
    .replace(/<\?xml-stylesheet[^>]*\?>/g, "")
    .replace(
      /(\d*\.?\d+)rem/g,
      (_, value: string) => `${Number(value) * BROWSER_ROOT_FONT_SIZE_PX}px`
    )
    .replace(
      /<svg\b([^>]*?)\swidth="[^"]*"([^>]*?)\sheight="[^"]*"/,
      `<svg$1 width="${width}"$2 height="${height}" viewBox="${x} ${y} ${width} ${height}"`
    );
}

function toDataUri(mimeType: string, data: Buffer): string {
  return `data:${mimeType};base64,${data.toString("base64")}`;
}
