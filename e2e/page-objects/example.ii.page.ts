import {InternetIdentityPage} from '@dfinity/internet-identity-playwright';
import {assertNonNullish} from '@dfinity/utils';
import {AppPageParams} from './app.page';
import {ExamplePage} from './example.page';

export class ExampleInternetIdentityPage extends ExamplePage {
  #identity: number | undefined;

  #iiPage: InternetIdentityPage;

  constructor(params: AppPageParams) {
    super(params);

    this.#iiPage = new InternetIdentityPage({
      page: this.page,
      context: this.context,
      browser: this.browser
    });
  }

  async waitReady(): Promise<void> {
    const REPLICA_URL = 'http://127.0.0.1:5987';
    const INTERNET_IDENTITY_ID = 'rdmx6-jaaaa-aaaaa-aaadq-cai';

    await this.#iiPage.waitReady({url: REPLICA_URL, canisterId: INTERNET_IDENTITY_ID});
  }

  override async signIn(): Promise<void> {
    this.#identity = await this.#iiPage.signInWithNewIdentity({
      selector: this.locators.sign_in_with_ii
    });
  }

  async signInWithIdentity(): Promise<void> {
    assertNonNullish(this.#identity);

    await this.#iiPage.signInWithIdentity({
      identity: this.#identity,
      selector: this.locators.sign_in_with_ii
    });
  }
}
