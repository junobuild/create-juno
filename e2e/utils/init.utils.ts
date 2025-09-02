import {testWithII} from '@dfinity/internet-identity-playwright';
import {AppPageParams} from '../page-objects/app.page';
import {ExampleInternetIdentityPage} from '../page-objects/example.ii.page';
import {ExamplePage} from '../page-objects/example.page';
import {ExamplePasskeyPage} from '../page-objects/example.passkey.page';

export const initTestSuiteWithInternetIdentity = (): (() => ExampleInternetIdentityPage) =>
  initTestSuite(ExampleInternetIdentityPage);

export const initTestSuiteWithPasskey = (): (() => ExamplePasskeyPage) =>
  initTestSuite(ExamplePasskeyPage);

const initTestSuite = <T extends ExamplePage>(
  classRef: new (params: AppPageParams) => T
): (() => T) => {
  testWithII.describe.configure({mode: 'serial'});

  let examplePage: T;

  testWithII.beforeAll(async ({playwright}) => {
    testWithII.setTimeout(120000);

    const browser = await playwright.chromium.launch();

    const context = await browser.newContext();
    const page = await context.newPage();

    examplePage = new classRef({
      page,
      context,
      browser
    });

    await examplePage.goto();

    await examplePage.signIn();
  });

  testWithII.afterAll(async () => {
    await examplePage.close();
  });

  return (): T => examplePage;
};
