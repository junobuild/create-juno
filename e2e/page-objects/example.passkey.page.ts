import {AppPageParams} from './app.page';
import {ExamplePage} from './example.page';

export class ExamplePasskeyPage extends ExamplePage {
  constructor(params: AppPageParams) {
    super(params);
  }

  // @ts-ignore
  waitReady(): Promise<void> {
    // Nothing here
  }

  signUp(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  signIn(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
