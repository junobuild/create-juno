import {Browser, BrowserContext, Page} from '@playwright/test';

export interface AppPageParams {
  page: Page;
  context: BrowserContext;
  browser: Browser;
}

export abstract class AppPage {
  protected readonly page: Page;
  protected readonly context: BrowserContext;
  protected readonly browser: Browser;

  protected readonly callToActions = {
    login: 'Sign in for dev',
    logout: 'Logout',
    add_an_entry: 'Add an entry',
    submit: 'Submit'
  };

  protected readonly locators = {
    open_data: 'a[aria-label="Open data"]',
    delete_entry: 'button[aria-label="Delete entry"]'
  };

  protected constructor({page, context, browser}: AppPageParams) {
    this.page = page;
    this.context = context;
    this.browser = browser;
  }

  waitReady?(): Promise<void>;

  cleanUp?(): Promise<void>;

  abstract signIn(): Promise<void>;

  async signOut(): Promise<void> {
    const button = this.page.locator('button', {hasText: this.callToActions.logout});
    await button.click();
  }

  async close(): Promise<void> {
    await this.page.close();
    await this.browser.close();
  }
}
