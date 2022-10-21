import type { ChromiumBrowser } from "playwright-core";
import { launchChromium } from "playwright-aws-lambda";
import axios from "axios";

import type { ScreenshotResult } from "./types";

export async function takeScreenshot(url: string): Promise<ScreenshotResult> {
  let browser: ChromiumBrowser | null = null;

  try {
    const warmupPageCache = axios.get(url);

    browser = await launchChromium({ headless: true });
    const context = await browser.newContext({
      locale: "pl-PL",
      userAgent:
        "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36",
    });

    const page = await context.newPage();
    await page.setViewportSize({ width: 600, height: 800 });

    await warmupPageCache;

    const response = await page.goto(url);
    await page.addStyleTag({
      content: "* { -webkit-font-smoothing: antialiased; }",
    });

    await page.waitForTimeout(500);

    const screenshot = await page.screenshot();
    const headers = (await response?.allHeaders()) || {};

    return { screenshot, headers };
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
