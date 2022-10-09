import type { VercelResponse } from "@vercel/node";
import { IS_DEVELOPMENT, SELF_URL } from "./config";

export function setProxyMaxAge(
  res: VercelResponse,
  maxAgeSeconds: number
): void {
  res.setHeader("Cache-Control", `max-age=0, s-maxage=${maxAgeSeconds}`);
}

export function getSelfUrl() {
  const protocol = IS_DEVELOPMENT ? "http" : "https";

  return `${protocol}://${SELF_URL}`;
}
