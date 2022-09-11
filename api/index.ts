import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createCanvas } from "@napi-rs/canvas";

export default (req: VercelRequest, res: VercelResponse) => {
  const width = 600;
  const height = 800;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);

  context.font = "bold 70pt sans";
  context.textAlign = "center";
  context.fillStyle = "#fff";
  context.fillText("Kindle", width / 2, height / 2);

  const time = new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
  });
  context.font = "bold 20pt 'PT Sans'";
  context.fillText(time, width / 2, (height / 4) * 3);

  const buffer = canvas.toBuffer("image/png");

  res.setHeader("Content-Type", "image/png");
  return res.send(buffer);
};
