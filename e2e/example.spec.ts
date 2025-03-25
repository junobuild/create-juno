import {testWithII} from '@dfinity/internet-identity-playwright';
import {initTestSuite} from './utils/init.utils';

const getExamplePage = initTestSuite();

testWithII('should sign-in', async () => {
  const examplePage = getExamplePage();

  await examplePage.assertSignedIn();
});

testWithII('should add an entry', async () => {
  const examplePage = getExamplePage();

  await examplePage.addEntry('My notes.');
});

testWithII('should add another entry', async () => {
  const examplePage = getExamplePage();

  await examplePage.addEntry('My other notes.');
});

testWithII('should sign-out', async () => {
  const examplePage = getExamplePage();

  await examplePage.signOut();

  await examplePage.assertSignedOut();
});
