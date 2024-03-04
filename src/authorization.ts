import type { VercelRequest } from "@vercel/node";
// @ts-ignore
import scmp from "scmp";

import { AUTH_TOKEN, IS_DEVELOPMENT } from "./config.js";

export function isAuthorized(req: VercelRequest): boolean {
  const { auth = "" } = req.query || {};

  const expected = Buffer.from(AUTH_TOKEN);
  const provided = Buffer.from(auth.toString());

  return scmp(expected, provided) || IS_DEVELOPMENT;
}
