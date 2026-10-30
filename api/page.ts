import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fileURLToPath } from "node:url";

import nunjucks from "nunjucks";
import { isAuthorized } from "../src/authorization.js";
import { getPageData, parsePageDataOptions } from "../src/page-data.js";
import { setProxyMaxAge } from "../src/vercel.js";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ status: "no auth" });
  }

  nunjucks.configure(fileURLToPath(new URL("../templates", import.meta.url)), {
    autoescape: true,
  });

  const { nextRefreshSeconds, ...pageData } = await getPageData(
    parsePageDataOptions(req.query)
  );

  const pageHtml = nunjucks.render("index.njk", pageData);

  res.setHeader("X-Next-Refresh", nextRefreshSeconds);

  setProxyMaxAge(res, nextRefreshSeconds - 10);

  return res.status(200).send(pageHtml);
};
