import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

import { FONT_FAMILY, FONT_WEIGHT } from "./theme.ts";

export const FONT_FILES = {
  regular: fileURLToPath(
    new URL("../../assets/fonts/Montserrat-Medium.ttf", import.meta.url)
  ),
  bold: fileURLToPath(
    new URL("../../assets/fonts/Montserrat-Bold.ttf", import.meta.url)
  ),
  italic: fileURLToPath(
    new URL("../../assets/fonts/Montserrat-MediumItalic.ttf", import.meta.url)
  ),
} as const;

export type SatoriFont = {
  name: string;
  data: Buffer;
  weight: (typeof FONT_WEIGHT)[keyof typeof FONT_WEIGHT];
  style: "normal" | "italic";
};

let fontsCache: Promise<SatoriFont[]> | null = null;

export function loadFonts(): Promise<SatoriFont[]> {
  fontsCache ??= Promise.all([
    readFont(FONT_FILES.regular, FONT_WEIGHT.regular, "normal"),
    readFont(FONT_FILES.bold, FONT_WEIGHT.bold, "normal"),
    readFont(FONT_FILES.italic, FONT_WEIGHT.regular, "italic"),
  ]);

  return fontsCache;
}

async function readFont(
  path: string,
  weight: SatoriFont["weight"],
  style: SatoriFont["style"]
): Promise<SatoriFont> {
  return { name: FONT_FAMILY, data: await readFile(path), weight, style };
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
