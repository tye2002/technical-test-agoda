import { Page, Locator } from '@playwright/test';
import { DateHelper } from '../utils/DateHelper';

export class AgodaHomePage {
  readonly page: Page;
  readonly destinationInput: Locator;
  readonly checkInBox: Locator;
  readonly occupancyBox: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.destinationInput = page.locator(
      '[data-selenium="textInput"]'
    );
    this.checkInBox = page.locator(
      '[data-element-name="search-box-check-in"]'
    );
    this.occupancyBox = page.locator('#occupancy-box');
    this.searchButton = page.locator(
      '[data-element-name="search-button"]'
    );
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.agoda.com/', {
      waitUntil: 'domcontentloaded'
    });
  }

  async searchDestination(
    destination: string
  ): Promise<void> {
    await this.destinationInput.click();
    await this.destinationInput.fill(destination);

    const searchItem = this.page
      .locator('[data-selenium="autocomplete-item"], ul li')
      .first();
    await searchItem.waitFor({
      state: 'visible',
      timeout: 10000
    });
    await searchItem.click();
  }

  async selectDates(
    checkInOffset: number,
    checkOutOffset: number
  ): Promise<void> {
    const checkInDate =
      DateHelper.getOffsetDate(checkInOffset);
    const checkOutDate =
      DateHelper.getOffsetDate(checkOutOffset);

    await this.checkInBox.click();
    await this.clickDateCell(checkInDate);
    await this.clickDateCell(checkOutDate);
  }

  private async clickDateCell(
    targetDate: Date
  ): Promise<void> {
    const pattern =
      DateHelper.getAgodaAriaLabelPattern(targetDate);
    const cell = this.page
      .locator(`[aria-label*="${pattern}"]`)
      .first();
    await cell.waitFor({
      state: 'visible',
      timeout: 10000
    });
    await cell.click();
  }

  async setOccupancy(
    targetRooms: number,
    targetAdults: number,
    targetChildren: number
  ): Promise<void> {
    const roomPlusBtn = this.page
      .locator(
        '[data-element-name="occupancy-selector-panel-rooms"][data-selenium="plus"]'
      )
      .first();
    const adultPlusBtn = this.page
      .locator(
        '[data-element-name="occupancy-selector-panel-adult"][data-selenium="plus"]'
      )
      .first();
    const childPlusBtn = this.page
      .locator(
        '[data-element-name="occupancy-selector-panel-children"][data-selenium="plus"]'
      )
      .first();

    const isPopupVisible = await roomPlusBtn
      .isVisible()
      .catch(() => false);
    if (!isPopupVisible) {
      await this.occupancyBox.first().click();
      await roomPlusBtn.waitFor({
        state: 'visible',
        timeout: 15000
      });
    }

    const currentRooms = 1;
    if (targetRooms > currentRooms) {
      for (let i = 0; i < targetRooms - currentRooms; i++) {
        await roomPlusBtn.click();
      }
    }

    const currentAdults = 2;
    if (targetAdults > currentAdults) {
      for (
        let i = 0;
        i < targetAdults - currentAdults;
        i++
      ) {
        await adultPlusBtn.click();
      }
    }

    const currentChildren = 0;
    if (targetChildren > currentChildren) {
      for (
        let i = 0;
        i < targetChildren - currentChildren;
        i++
      ) {
        await childPlusBtn.click();
      }
    }

    await this.page.keyboard.press('Escape');
  }

  async clickSearch(): Promise<void> {
    await this.searchButton.first().click();
  }
}
