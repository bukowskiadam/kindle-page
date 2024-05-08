import type { BrowserContext, ChromiumBrowser } from "playwright-core";
import { chromium as playwright } from "playwright-core";
import chromium from "@sparticuz/chromium";
import axios from "axios";

import type { ScreenshotResult } from "./types.js";

/**
 * this is an optimization to avoid launching a new browser for every screenshot
 * on the first run screenshot might fail due to the startup time of the browser
 * but on the next runs, it should be faster. Kindle requests 3 times to get the
 * image. I hope this will work ok.
 */
let _browser: ChromiumBrowser | null;

async function launchBrowser(): Promise<ChromiumBrowser> {
  if (_browser) {
    return _browser;
  }

  _browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  return _browser;
}

export async function takeScreenshot(url: string): Promise<ScreenshotResult> {
  let browser: ChromiumBrowser | null = null;
  let context: BrowserContext | null = null;

  try {
    const warmupPageCache = axios.get(url);

    browser = await launchBrowser();
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
