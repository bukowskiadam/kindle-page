import type { VercelRequest } from "@vercel/node";
import { AUTH_TOKEN, IS_DEVELOPMENT } from "./config";

export function isAuthorized(req: VercelRequest): boolean {
  const { auth = "" } = req.query || {};

  return auth === AUTH_TOKEN || IS_DEVELOPMENT;
}
