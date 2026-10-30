import type { VercelResponse } from "@vercel/node";

export function setProxyMaxAge(
  res: VercelResponse,
  maxAgeSeconds: number
): void {
  res.setHeader("Cache-Control", `max-age=0, s-maxage=${maxAgeSeconds}`);
}
