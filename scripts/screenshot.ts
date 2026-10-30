/**
 * Renders the README sample image from mock data (calendar, Airly) and live
 * public data (yr.no meteogram, synonym of the day).
 *
 * Usage: npm run screenshot [-- <dayMode>]
 * Run through the npm script: it sets VERCEL_ENV=development, which makes
 * the data loaders return mocks.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { IS_DEVELOPMENT } from "../src/config.js";
import { getAirlyData } from "../src/data/airly.js";
import { getCalendarData } from "../src/data/calendar.js";
import { getSynonymOfTheDay } from "../src/data/thesaurus-com.js";
import { imageForKindle } from "../src/for-kindle.js";
import { getPageData } from "../src/page-data.js";
import { loadRenderAssets } from "../src/render/assets.js";
import { layoutFor } from "../src/render/components/layouts.js";
import {
  renderDashboardPng,
  renderDashboardSvg,
} from "../src/render/render-png.js";
import { validateDayMode } from "../src/schedule.js";

const SAMPLE_BATTERY_PERCENT = 77;
const DEFAULT_DAY_MODE = "day";
const OUTPUT_FILE = fileURLToPath(new URL("../screenshot.png", import.meta.url));

async function main() {
  if (!IS_DEVELOPMENT) {
    throw new Error("Run via `npm run screenshot` so mock data is used");
  }

  const modeArg = process.argv[2] ?? DEFAULT_DAY_MODE;
  const forceMode = validateDayMode(modeArg);

  if (!forceMode) {
    throw new Error(`Unknown day mode: ${modeArg}`);
  }

  const now = new Date();
  // Direct Airly loader instead of the HTTP one: in development it returns mocks.
  const sources = { getCalendarData, getAirlyData, getSynonymOfTheDay };

  const [data, assets] = await Promise.all([
    getPageData({ battery: SAMPLE_BATTERY_PERCENT, forceMode }, now, sources),
    loadRenderAssets({ withMeteogram: layoutFor(forceMode).withMeteogram }),
  ]);

  const png = renderDashboardPng(await renderDashboardSvg(data, assets));
  await writeFile(OUTPUT_FILE, new Uint8Array(imageForKindle(png)));

  console.log(`Saved ${forceMode} layout to ${OUTPUT_FILE}`);
}

await main();
