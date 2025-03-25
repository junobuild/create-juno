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

testWithII('should add an entry with file', async () => {
  const examplePage = getExamplePage();

  await examplePage.addEntryWithFile({
    text: 'My file.',
    filePath: 'e2e/data/dog.jpg',
    fileName: 'dog.jpg'
  });

  await examplePage.assertUploadedImage();
});

const lastEntryText = 'My last note.';

testWithII('should add another entry', async () => {
  const examplePage = getExamplePage();

  await examplePage.addEntry(lastEntryText);
});

testWithII('should delete entry', async () => {
  const examplePage = getExamplePage();

  await examplePage.deleteLastEntry();
});

testWithII('should sign-out', async () => {
  const examplePage = getExamplePage();

  await examplePage.signOut();

  await examplePage.assertSignedOut();
});

// TODO: testWithII does not seem to support setting dark or light mode so for now we just use screenshot of default mode

testWithII('match login screenshot', async () => {
  const examplePage = getExamplePage();

  await examplePage.assertSignedOut();

  await examplePage.assertScreenshot({mode: 'current', name: 'login'});
});

testWithII('match logged in screenshot', async () => {
  const examplePage = getExamplePage();

  await examplePage.signInWithIdentity();

  await examplePage.assertSignedIn();

  await examplePage.assertScreenshot({mode: 'current', name: 'logged-in'});
});

testWithII('match modal screenshot', async () => {
  const examplePage = getExamplePage();

  await examplePage.openAddEntry();

  await examplePage.assertScreenshot({mode: 'current', name: 'login'});

  await examplePage.closeAddEntryModal();
});

testWithII('match logout screenshot', async () => {
  const examplePage = getExamplePage();

  await examplePage.signOut();

  await examplePage.assertSignedOut();

  await examplePage.assertScreenshot({mode: 'current', name: 'logout'});
});
