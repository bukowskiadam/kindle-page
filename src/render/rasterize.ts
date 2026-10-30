import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

import { FONT_FAMILY, FONT_WEIGHT } from "./theme.js";

export const FONT_FILES = {
  regular: fileURLToPath(
    new URL("../../assets/fonts/Montserrat-Medium.ttf", import.meta.url)
  ),
  bold: fileURLToPath(
    new URL("../../assets/fonts/Montserrat-Bold.ttf", import.meta.url)
  ),
} as const;

export type SatoriFont = {
  name: string;
  data: Buffer;
  weight: (typeof FONT_WEIGHT)[keyof typeof FONT_WEIGHT];
  style: "normal";
};

let fontsCache: Promise<SatoriFont[]> | null = null;

export function loadFonts(): Promise<SatoriFont[]> {
  fontsCache ??= Promise.all([
    readFont(FONT_FILES.regular, FONT_WEIGHT.regular),
    readFont(FONT_FILES.bold, FONT_WEIGHT.bold),
  ]);

  return fontsCache;
}

async function readFont(
  path: string,
  weight: SatoriFont["weight"]
): Promise<SatoriFont> {
  return { name: FONT_FAMILY, data: await readFile(path), weight, style: "normal" };
}

/**
 * There are no system fonts on Vercel, so every font family falls back to
 * the bundled one. Note: resvg does not apply these fonts to SVGs nested via
 * <image>, so such SVGs have to be rasterized separately before embedding.
 */
export function svgToPng(svg: string, width: number): Buffer {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontFiles: [FONT_FILES.regular, FONT_FILES.bold],
      loadSystemFonts: false,
      defaultFontFamily: FONT_FAMILY,
      sansSerifFamily: FONT_FAMILY,
    },
  });

  return resvg.render().asPng();
}
