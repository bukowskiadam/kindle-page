import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAirlyData } from "../src/airly.js";

import { isAuthorized } from "../src/authorization.js";
import { setProxyMaxAge } from "../src/vercel.js";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({
      type: "error",
      error: "Missing auth token in request",
    });
  }

  const data = await getAirlyData();

  setProxyMaxAge(res, 15 * 60);

  return res.json(data);
};
