import {
  Before,
  After,
  Status,
  setDefaultTimeout
} from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { AgodaWorld } from './custom-world';

setDefaultTimeout(60000);

Before(async function (this: AgodaWorld) {
  const isHeadless = process.env.HEADLESS === 'true';
  this.browser = await chromium.launch({
    headless: isHeadless,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  this.context = await this.browser.newContext({
    viewport: { width: 1400, height: 900 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    locale: 'en-US'
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(30000);
  this.page.setDefaultNavigationTimeout(30000);
});

After(async function (this: AgodaWorld, scenario) {
  if (
    scenario.result?.status === Status.FAILED &&
    this.page
  ) {
    const screenshot = await this.page.screenshot({
      fullPage: true
    });
    await this.attach(screenshot, 'image/png');
  }
  await this.context?.close();
  await this.browser?.close();
});
