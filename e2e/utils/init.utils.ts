import {test} from '@playwright/test';
import {AppPageParams} from '../page-objects/app.page';
import {ExampleInternetIdentityPage} from '../page-objects/example.dev-sign-in.page';
import {ExamplePage} from '../page-objects/example.page';

export const initTestSuiteWithInternetIdentity = (): (() => ExampleInternetIdentityPage) => {
  return initTestSuite(ExampleInternetIdentityPage.create);
};

const initTestSuite = <T extends ExamplePage>(
  create: (params: AppPageParams) => Promise<T>
): (() => T) => {
  let examplePage: T;

  test.beforeAll(async ({playwright}) => {
    test.setTimeout(120000);

    const browser = await playwright.chromium.launch();

    const context = await browser.newContext();
    const page = await context.newPage();

    examplePage = await create({
      page,
      context,
      browser
    });

    await examplePage.waitReady?.();

    await examplePage.goto();

    await examplePage.signIn();
  });

  test.afterAll(async () => {
    await examplePage.cleanUp?.();

    await examplePage.close();
  });

  return (): T => examplePage;
};
