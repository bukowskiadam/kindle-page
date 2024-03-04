import type { VercelResponse } from "@vercel/node";
import { SELF_URL, SELF_PROTOCOL } from "./config.js";

export function setProxyMaxAge(
  res: VercelResponse,
  maxAgeSeconds: number
): void {
  res.setHeader("Cache-Control", `max-age=0, s-maxage=${maxAgeSeconds}`);
}

export function getSelfUrl() {
  return `${SELF_PROTOCOL}://${SELF_URL}`;
}
