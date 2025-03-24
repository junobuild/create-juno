import {expect, test} from '@playwright/test';

const TEMPLATE = process.env.TEMPLATE ?? '';

(['light', 'dark'] as const).forEach((mode) => {
  test.describe(`${mode} mode`, () => {
    test.use({colorScheme: mode});

    test('match screenshot', async ({page}) => {
      await page.goto('/');

      await expect(page).toHaveScreenshot(`${mode}-mode.png`, {fullPage: true});
    });
  });
});

test('has title', async ({page}) => {
  await page.goto('/');

  const capitalize = (s: string): string => s[0].toUpperCase() + s.slice(1);
  const capitalizeAll = (s: string): string =>
    s.replaceAll('-', ' ').split(' ').map(capitalize).join(' ');

  await expect(page).toHaveTitle(`Juno / ${capitalizeAll(TEMPLATE)}`);
});

test('get quickstart link', async ({page}) => {
  await page.goto('/');

  const link = page.locator('a[aria-label="Open quickstart guides on Juno\'s website"]');

  const framework = TEMPLATE.split("-")[0];

  await expect(link).toHaveAttribute('href', `https://juno.build/docs/guides/${framework}`);
});

test('get documentation link', async ({page}) => {
  await page.goto('/');

  const link = page.locator(
    'a[aria-label="Open the list of features for building apps on Juno\'s website"]'
  );

  await expect(link).toHaveAttribute('href', 'https://juno.build/docs/category/build');
});

test('get ci link', async ({page}) => {
  await page.goto('/');

  const link = page.locator('a[aria-label="Open the guide to setting up GitHub Actions for Juno"]');

  await expect(link).toHaveAttribute(
    'href',
    'https://juno.build/docs/guides/github-actions'
  );
});

test('get discord link', async ({page}) => {
  await page.goto('/');

  const link = page.locator(
    'a[aria-label="Join Juno\'s Discord channel for questions or to share the fun"]'
  );

  await expect(link).toHaveAttribute('href', 'https://discord.gg/wHZ57Z2RAG');
});
