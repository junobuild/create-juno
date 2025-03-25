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

const lastEntryText = "My last note.";

testWithII('should add another entry', async () => {
  const examplePage = getExamplePage();

  await examplePage.addEntry(lastEntryText);
});

testWithII('should delete entry', async () => {
  const examplePage = getExamplePage();

  await examplePage.deleteLastEntry(lastEntryText);
});

testWithII('should sign-out', async () => {
  const examplePage = getExamplePage();

  await examplePage.signOut();

  await examplePage.assertSignedOut();
});
