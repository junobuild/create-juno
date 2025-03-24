import {testWithII} from '@dfinity/internet-identity-playwright';
import {assertNonNullish} from '@dfinity/utils';

let identity: number | undefined = undefined;

testWithII('should sign-in with a new user', async ({page, iiPage}) => {
  await page.goto('/');

  identity = await iiPage.signInWithNewIdentity();
});

testWithII('should sign-in with an existing user', async ({page, iiPage}) => {
  await page.goto('/');

  assertNonNullish(identity);

  console.log(identity)

  await iiPage.signInWithIdentity({identity});
});
