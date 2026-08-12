import { Page, Locator, expect } from '@playwright/test';
import { DateHelper, DateFormatPattern } from '../utils/DateHelper';

export class AgodaSearchResultsPage {
  readonly page: Page;
  readonly propertyCardContainers: Locator;
  readonly hotelName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.propertyCardContainers = page.locator('[data-selenium="selectedHotelContainer"]');
    this.hotelName = page.locator('[data-selenium="hotel-name"]');
  }

  async waitForResultsLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.propertyCardContainers.first().waitFor({
      state: 'visible',
      timeout: 30000
    });
  }

  async selectFirstAvailableOption(): Promise<Page> {
    await this.waitForResultsLoad();
    const firstHotel = this.hotelName.first();
    await firstHotel.waitFor({ state: 'visible' });

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 15000 }).catch(() => this.page),
      firstHotel.click()
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  async verifySearchDates(checkInPlus: number, checkOutPlus: number): Promise<void> {
    await this.waitForResultsLoad();
    const checkInDate = DateHelper.getOffsetDate(checkInPlus);
    const checkOutDate = DateHelper.getOffsetDate(checkOutPlus);

    const checkInDay = DateHelper.getAgodaAriaLabelPattern(checkInDate, DateFormatPattern.DAY_SINGLE_MONTH_YEAR);
    const checkOutDay = DateHelper.getAgodaAriaLabelPattern(checkOutDate, DateFormatPattern.DAY_SINGLE_MONTH_YEAR);

    const checkInBox = this.page.locator('[data-selenium="checkInText"]');
    const checkOutBox = this.page.locator('[data-selenium="checkOutText"]');

    await expect(checkInBox).toContainText(checkInDay);
    await expect(checkOutBox).toContainText(checkOutDay);
  }

  async verifySearchOccupancy(expectedRooms: number, expectedAdults: number, expectedChildren: number): Promise<void> {
    await this.waitForResultsLoad();

    const searchRooms = this.page.locator('[data-selenium="roomValue"]');
    await expect(searchRooms).toContainText(String(expectedRooms));

    const searchAdults = this.page.locator('[data-selenium="adultValue"]');
    await expect(searchAdults).toContainText(String(expectedAdults));

    if (expectedChildren > 0) {
      const searchChildren = this.page.locator('[data-selenium="childValue"]');
      await expect(searchChildren).toContainText(String(expectedChildren));
    }
  }
}
