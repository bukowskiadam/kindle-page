import type { BrowserContext, ChromiumBrowser } from "playwright-core";
import { launchChromium } from "playwright-aws-lambda";
import axios from "axios";

import type { ScreenshotResult } from "./types.js";

export async function takeScreenshot(url: string): Promise<ScreenshotResult> {
  let browser: ChromiumBrowser | null = null;
  let context: BrowserContext | null = null;

  try {
    const warmupPageCache = axios.get(url);

    browser = await launchChromium({ headless: true });
    context = await browser.newContext({
      locale: "pl-PL",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      viewport: { width: 600, height: 800 },
    });

    const page = await context.newPage();

    const [response] = await Promise.all([page.goto(url), warmupPageCache]);

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
    if (context) {
      await context.close();
    }
    if (browser) {
      await browser.close();
    }
  }
}
