import {AppPageParams} from './app.page';
import {ExamplePage} from './example.page';

export class ExamplePasskeyPage extends ExamplePage {
  constructor(params: AppPageParams) {
    super(params);
  }

  signIn(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
