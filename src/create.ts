import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import { losslessCompressPngSync, Transformer } from "@napi-rs/image";

export async function createPage(): Promise<Buffer> {
  GlobalFonts.registerFromPath(
    __dirname + "/../fonts/hack-regular.ttf",
    "hack"
  );
  const width = 600;
  const height = 800;
  let currentY = 2;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // BACKGROUND
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, width, height);

  // DATE HEADER
  const now = new Date();
  const date = now
    .toLocaleString("pl-PL", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
    })
    .toLocaleUpperCase();
  context.font = "regular 30px hack";
  context.textAlign = "right";
  context.fillStyle = "#000000";
  context.textBaseline = "top";
  context.fillText(date, width - 10, currentY);
  currentY += 34;

  // DIVIDER LINE
  context.fillRect(0, currentY, width, 1);
  currentY += 1;

  // WEATHER IMAGE
  const weatherImage = await loadImage(
    "https://www.meteo.pl/um/metco/mgram_pict.php?ntype=0u&row=466&col=232&lang=pl"
  );
  const sourceX = weatherImage.width > 600 ? 15 : 0;
  const sourceW = weatherImage.width > 600 ? 600 : weatherImage.width;
  context.drawImage(
    weatherImage,
    sourceX,
    0,
    sourceW,
    630,
    Math.floor((600 - sourceW) / 2),
    currentY,
    sourceW,
    630
  );
  currentY += 630 + 2;

  // DIVIDER LINE
  context.fillRect(0, currentY, width, 1);
  currentY += 2;

  // UPDATE TIME FOOTER
  const time = now.toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
    hour: "2-digit",
    minute: "2-digit",
  });
  context.font = "regular 16px hack";
  context.textAlign = "right";
  context.fillStyle = "#000000";
  context.textBaseline = "alphabetic";
  context.fillText(time, width - 2, height - 3);

  // EXPORT OPTIMIZED PNG
  const buffer = canvas.toBuffer("image/png");
  const grayscale = new Transformer(buffer).grayscale().pngSync();
  const compressed = losslessCompressPngSync(grayscale);

  return compressed;
}
