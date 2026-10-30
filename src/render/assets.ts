import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import axios from "axios";

import { svgToPng } from "./rasterize.ts";
import { PAGE_WIDTH } from "./theme.ts";

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

// Static URLs so Vercel's file tracer bundles the images with the function.
const LOCAL_IMAGE_FILES = {
  groomingCat: new URL("../../assets/images/grooming-cat.svg", import.meta.url),
  sleepingKitty: new URL("../../assets/images/sleeping-kitty.svg", import.meta.url),
} as const;

export type LocalImageName = keyof typeof LOCAL_IMAGE_FILES;

export type SvgImage = {
  dataUri: string;
  /** height / width, taken from the SVG viewBox */
  aspectRatio: number;
};

export type RenderAssets = {
  airlyLogoDataUri: string;
  /** null when the layout does not show the forecast */
  meteogramDataUri: string | null;
  images: Record<LocalImageName, SvgImage>;
};

export type RenderAssetsOptions = {
  withMeteogram: boolean;
};

export async function loadRenderAssets({
  withMeteogram,
}: RenderAssetsOptions): Promise<RenderAssets> {
  const [airlyLogo, meteogramDataUri, images] = await Promise.all([
    fetchText(AIRLY_LOGO_URL),
    withMeteogram ? loadMeteogram() : null,
    loadLocalImages(),
  ]);

  return {
    airlyLogoDataUri: toDataUri("image/svg+xml", Buffer.from(airlyLogo)),
    meteogramDataUri,
    images,
  };
}

async function loadMeteogram(): Promise<string> {
  const meteogram = await fetchText(METEOGRAM_URL);
  const meteogramPng = svgToPng(prepareMeteogram(meteogram), METEOGRAM_CROP.width);

  return toDataUri("image/png", meteogramPng);
}

let localImagesCache: Promise<Record<LocalImageName, SvgImage>> | null = null;

function loadLocalImages(): Promise<Record<LocalImageName, SvgImage>> {
  localImagesCache ??= Promise.all(
    Object.entries(LOCAL_IMAGE_FILES).map(
      async ([name, file]) => [name, await readLocalSvg(file)] as const
    )
  ).then((entries) => Object.fromEntries(entries) as Record<LocalImageName, SvgImage>);

  return localImagesCache;
}

async function readLocalSvg(file: URL): Promise<SvgImage> {
  const svg = await readFile(fileURLToPath(file));

  return {
    dataUri: toDataUri("image/svg+xml", svg),
    aspectRatio: viewBoxAspectRatio(svg.toString(), file),
  };
}

function viewBoxAspectRatio(svg: string, file: URL): number {
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  const [, , width, height] = viewBox?.trim().split(/[\s,]+/).map(Number) ?? [];

  if (!width || !height) {
    throw new Error(`Cannot read viewBox size of ${file}`);
  }

  return height / width;
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
