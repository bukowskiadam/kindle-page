import type { ChromiumBrowser } from "playwright-core";
import { launchChromium } from "playwright-aws-lambda";
import axios from "axios";

export async function takeScreenshot(
  url: string,
  calendarEventsUrl: string
): Promise<Buffer> {
  let browser: ChromiumBrowser | null = null;

  try {
    const warmupCalendarCache = axios.get(calendarEventsUrl);

    browser = await launchChromium({ headless: true });
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36",
    });

    const page = await context.newPage();
    await page.setViewportSize({ width: 600, height: 800 });

    await warmupCalendarCache;

    await page.goto(url);
    await page.addStyleTag({
      content: "* { -webkit-font-smoothing: antialiased; }",
    });

    await page
      .frameLocator("#airly-widget")
      .locator("body", { hasText: "Temperatura" })
      .waitFor();

    return await page.screenshot();
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
