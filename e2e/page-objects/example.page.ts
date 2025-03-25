import {InternetIdentityPage} from '@dfinity/internet-identity-playwright';
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
    this.identity = await this.#partyIIPage.signInWithNewIdentity();
  }

  /**
   * @override
   */
  async signOut(): Promise<void> {
    await this.page.getByTestId('logout-button').click();
  }

  async waitReady(): Promise<void> {
    const REPLICA_URL = 'http://127.0.0.1:5987';
    const INTERNET_IDENTITY_ID = 'rdmx6-jaaaa-aaaaa-aaadq-cai';

    await this.#partyIIPage.waitReady({url: REPLICA_URL, canisterId: INTERNET_IDENTITY_ID});
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
