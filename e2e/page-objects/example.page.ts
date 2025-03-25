import {InternetIdentityPage} from '@dfinity/internet-identity-playwright';
import {assertNonNullish} from '@dfinity/utils';
import {expect} from '@playwright/test';
import {IdentityPage, IdentityPageParams} from './identity.page';

export class ExamplePage extends IdentityPage {
  #partyIIPage: InternetIdentityPage;

  constructor(params: IdentityPageParams) {
    super(params);

    this.#partyIIPage = new InternetIdentityPage({
      page: this.page,
      context: this.context,
      browser: this.browser
    });
  }

  /**
   * @override
   */
  async signIn(): Promise<void> {
    this.identity = await this.#partyIIPage.signInWithNewIdentity({
      selector: 'button:has-text("Sign in")'
    });
  }

  async signInWithIdentity(): Promise<void> {
    assertNonNullish(this.identity);

    await this.#partyIIPage.signInWithIdentity({
      identity: this.identity,
      selector: 'button:has-text("Sign in")'
    });
  }

  /**
   * @override
   */
  async signOut(): Promise<void> {
    const button = this.page.locator('button', {hasText: 'Logout'});
    await button.click();
  }

  async assertSignedIn(): Promise<void> {
    const button = this.page.locator('button', {hasText: 'Logout'});
    await expect(button).toBeVisible();
  }

  async assertSignedOut(): Promise<void> {
    const button = this.page.locator('button', {hasText: 'Sign in'});
    await expect(button).toBeVisible();
  }

  async waitReady(): Promise<void> {
    const REPLICA_URL = 'http://127.0.0.1:5987';
    const INTERNET_IDENTITY_ID = 'rdmx6-jaaaa-aaaaa-aaadq-cai';

    await this.#partyIIPage.waitReady({url: REPLICA_URL, canisterId: INTERNET_IDENTITY_ID});
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async addEntry(text: string): Promise<void> {
    const addEntryButton = this.page.locator('button', {hasText: 'Add an entry'});
    await expect(addEntryButton).toBeVisible();

    await addEntryButton.click();

    const textarea = this.page.locator('textarea');
    await textarea.fill(text);

    const button = this.page.locator('button', {hasText: 'Submit'});
    await button.click();

    const row = this.page.locator('[role="row"]', {hasText: text});
    await expect(row).toBeVisible();
  }

  async addEntryWithFile({text, filePath}: {text: string; filePath: string}): Promise<void> {
    const addEntryButton = this.page.locator('button', {hasText: 'Add an entry'});
    await expect(addEntryButton).toBeVisible();

    await addEntryButton.click();

    const textarea = this.page.locator('textarea');
    await textarea.fill(text);

    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    const button = this.page.locator('button', {hasText: 'Submit'});
    await button.click();

    const row = this.page.locator('[role="row"]', {hasText: text});
    await expect(row).toBeVisible({timeout: 60_000});
  }

  async assertUploadedImage(): Promise<void> {
    const [imgPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator('a[aria-label="Open data"]').click()
    ]);

    await imgPage.waitForLoadState('load');

    await expect(imgPage).toHaveScreenshot('uploaded-image.png', {
      maxDiffPixelRatio: 0.1
    });

    await imgPage.close();
  }

  async deleteLastEntry(): Promise<void> {
    const buttons = this.page.locator('button[aria-label="Delete entry"]');
    await buttons.last().click();

    await expect(this.page.locator('[role="row"]', {hasText: 'text'})).toHaveCount(0);
  }

  async assertScreenshot({
    mode,
    name
  }: {
    mode: 'light' | 'dark' | 'current';
    name: string;
  }): Promise<void> {
    await expect(this.page).toHaveScreenshot(`${name}-${mode}-mode.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.1
    });
  }

  async openAddEntry(): Promise<void> {
    const addEntryButton = this.page.locator('button', {hasText: 'Add an entry'});
    await expect(addEntryButton).toBeVisible();

    await addEntryButton.click();

    const textarea = this.page.locator('textarea');
    await expect(textarea).toBeVisible();
  }

  async closeAddEntryModal(): Promise<void> {
    const closeAddEntryButton = this.page.locator('button', {hasText: 'Close'});
    await expect(closeAddEntryButton).toBeVisible();

    await closeAddEntryButton.click();
  }
}
