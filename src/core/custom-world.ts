import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { AgodaHomePage } from '../pages/AgodaHomePage';
import { AgodaSearchResultsPage } from '../pages/AgodaSearchResultsPage';
import { AgodaHotelDetailPage } from '../pages/AgodaHotelDetailPage';

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  homePage?: AgodaHomePage;
  searchResultsPage?: AgodaSearchResultsPage;
  hotelDetailPage?: AgodaHotelDetailPage;
}

export class AgodaWorld extends World implements CustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  homePage?: AgodaHomePage;
  searchResultsPage?: AgodaSearchResultsPage;
  hotelDetailPage?: AgodaHotelDetailPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(AgodaWorld);
