import {expect} from '@playwright/test';
import type {AppPageParams} from './app.page';
import {ExamplePage} from './example.page';

export class ExampleInternetIdentityPage extends ExamplePage {
  private constructor(params: AppPageParams) {
    super(params);
  }

  static async create(params: AppPageParams): Promise<ExampleInternetIdentityPage> {
    return new ExampleInternetIdentityPage(params);
  }

  override async signIn(): Promise<void> {
    const signInButton = this.page.locator('button', {
      hasText: this.callToActions.login
    });
    await expect(signInButton).toBeVisible();

    await signInButton.click();
  }
}
