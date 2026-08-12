import { Page, Locator, expect } from '@playwright/test';

export class AgodaHotelDetailPage {
  readonly page: Page;
  readonly roomGrid: Locator;
  readonly priceBoxes: Locator;
  readonly soldOutBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.roomGrid = page.locator('#roomGridContent');
    this.priceBoxes = page.locator('[data-element-name="fpc-room-price"]');
    this.soldOutBox = page.locator('[data-element-name="mob-property-sold-out-all"]');
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getHotelPrice(): Promise<string> {
    const priceBox = this.priceBoxes.first();
    await expect(priceBox).toBeVisible({ timeout: 30000 });
    const priceText = (await priceBox.textContent())?.trim() ?? '';
    return priceText;
  }

  async verifyHotelPriceDisplayed(): Promise<string> {
    await this.waitForPageLoad();

    const isSoldOut = await this.soldOutBox.isVisible().catch(() => false);
    expect(isSoldOut, '❌ This hotel is sold out!').toBeFalsy();

    await this.roomGrid.scrollIntoViewIfNeeded().catch(() => {});

    const firstPriceBox = this.priceBoxes.first();
    await expect(firstPriceBox).toBeVisible({ timeout: 30000 });

    const priceText = await this.getHotelPrice();
    return priceText;
  }
}
