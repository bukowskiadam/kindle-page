import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ChromiumBrowser } from "playwright-core";
import { launchChromium } from "playwright-aws-lambda";
import {
  losslessCompressPngSync,
  Orientation,
  Transformer,
} from "@napi-rs/image";

export default async (req: VercelRequest, res: VercelResponse) => {
  let browser: ChromiumBrowser | null = null;

  try {
    browser = await launchChromium({ headless: true });
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36",
    });

    const page = await context.newPage();
    await page.setViewportSize({ width: 600, height: 800 });
    await page.goto(
      "https://weather.com/pl-PL/pogoda/dzisiaj/l/e5137ad59d68e86155f4cf59f3f44bb5e7bfe3b64adb102d1e81c677e3bb3ec3"
    );
    // await page.addStyleTag({ content: "* { -webkit-font-smoothing: none; }" });

    const buffer = await page.screenshot();

    const grayscale = new Transformer(buffer)
      .grayscale()
      .rotate(Orientation.Rotate180) // rotating because my kindle is upside-down
      .pngSync();

    const compressed = losslessCompressPngSync(grayscale);

    res.setHeader("Content-Type", "image/png");

    return res.send(compressed);
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
