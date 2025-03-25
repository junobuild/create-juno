import {testWithII} from '@dfinity/internet-identity-playwright';
import {ExamplePage} from '../page-objects/example.page';

export const initTestSuite = (): (() => ExamplePage) => {
  testWithII.describe.configure({mode: 'serial'});

  let examplePage: ExamplePage;

  testWithII.beforeAll(async ({playwright}) => {
    testWithII.setTimeout(120000);

    const browser = await playwright.chromium.launch();

    const context = await browser.newContext();
    const page = await context.newPage();

    examplePage = new ExamplePage({
      page,
      context,
      browser
    });

    await examplePage.waitReady();

    await examplePage.goto();

    await examplePage.signIn();
  });

  testWithII.afterAll(async () => {
    await examplePage.close();
  });

  return (): ExamplePage => examplePage;
};
