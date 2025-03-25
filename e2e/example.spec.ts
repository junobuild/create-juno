import {testWithII} from '@dfinity/internet-identity-playwright';
import {initTestSuite} from './utils/init.utils';

const getExamplePage = initTestSuite();

testWithII('should sign-in', async () => {
  const examplePage = getExamplePage();

  await examplePage.assertSignedIn();
});

testWithII('should sign-out', async () => {
  const examplePage = getExamplePage();

  await examplePage.signOut();

  await examplePage.assertSignedOut();
});
