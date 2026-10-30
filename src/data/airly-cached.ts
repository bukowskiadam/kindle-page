import { getCache } from "@vercel/functions";

import type { AirlyData, AirlyError } from "../types.ts";
import { getAirlyData } from "./airly.ts";

const CACHE_NAMESPACE = "kindle-page";
const AIRLY_CACHE_KEY = "airly-measurements";
/** Airly API has request limits; measurements update roughly every 15 minutes. */
const AIRLY_CACHE_TTL_SECONDS = 15 * 60;

/**
 * Airly data shared between function instances via Vercel Runtime Cache
 * (falls back to an in-memory cache outside Vercel). Errors are not cached,
 * so a single failed request doesn't hide the data for the whole TTL.
 */
export async function getCachedAirlyData(): Promise<AirlyData | AirlyError> {
  const cache = getCache({ namespace: CACHE_NAMESPACE });
  const cached = (await cache.get(AIRLY_CACHE_KEY)) as AirlyData | null;

  if (cached) {
    return cached;
  }

  const airly = await getAirlyData();

  if (airly.type === "data") {
    await cache.set(AIRLY_CACHE_KEY, airly, { ttl: AIRLY_CACHE_TTL_SECONDS });
  }

  return airly;
}
