import { Given, When, Then } from '@cucumber/cucumber';
import { AgodaWorld } from '../core/custom-world';
import { AgodaHomePage } from '../pages/AgodaHomePage';
import { AgodaSearchResultsPage } from '../pages/AgodaSearchResultsPage';
import { AgodaHotelDetailPage } from '../pages/AgodaHotelDetailPage';

Given('the user navigates to the Agoda home page', async function (this: AgodaWorld) {
  if (!this.page) throw new Error('Page context is not initialized');
  this.homePage = new AgodaHomePage(this.page);
  await this.homePage.navigate();
});

When('the user searches for hotel {string}', async function (this: AgodaWorld, hotelName: string) {
  await this.homePage!.searchDestination(hotelName);
});

When('the user selects check-in date as current date plus {int} days and check-out date as current date plus {int} days', async function (this: AgodaWorld, checkInPlus: number, checkOutPlus: number) {
  await this.homePage!.selectDates(checkInPlus, checkOutPlus);
});

When('the user selects {int} room, {int} adults, and {int} children', async function (this: AgodaWorld, rooms: number, adults: number, children: number) {
  await this.homePage!.setOccupancy(rooms, adults, children);
});

When('the user clicks the search button', async function (this: AgodaWorld) {
  await this.homePage!.clickSearch();
  this.searchResultsPage = new AgodaSearchResultsPage(this.page!);
});

Then('the search results should match check-in date plus {int} days and check-out date plus {int} days', async function (this: AgodaWorld, checkInPlus: number, checkOutPlus: number) {
  await this.searchResultsPage!.verifySearchDates(checkInPlus, checkOutPlus);
});

Then('the search results should match {int} room, {int} adults, and {int} children', async function (this: AgodaWorld, rooms: number, adults: number, children: number) {
  await this.searchResultsPage!.verifySearchOccupancy(rooms, adults, children);
});

When('the user chooses the first available option', async function (this: AgodaWorld) {
  const detailTab = await this.searchResultsPage!.selectFirstAvailableOption();
  this.hotelDetailPage = new AgodaHotelDetailPage(detailTab);
});

Then('the price of the hotel should be displayed', async function (this: AgodaWorld) {
  const price = await this.hotelDetailPage!.verifyHotelPriceDisplayed();
  this.attach(`💰 Hotel Price: ${price}`, 'text/plain');
});
