import type { VercelRequest, VercelResponse } from "@vercel/node";

import { createPage } from "../src/create";
import { upload } from "../src/upload";

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.query?.auth !== "test") {
    return res.status(401).json({ status: "no auth" });
  }
  const kindlePage = createPage();

  return upload(kindlePage)
    .then(() => res.json({ status: "ok" }))
    .catch((error) => res.json({ status: "error", error }));
};
