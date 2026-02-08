import {test} from '@playwright/test';
import {initTestSuiteWithInternetIdentity} from './utils/init.utils';

test.describe.configure({mode: 'serial'});

[{title: 'With Dev', initExamplePage: initTestSuiteWithInternetIdentity}].forEach(
  ({title, initExamplePage}) => {
    test.describe(title, () => {
      const getExamplePage = initExamplePage();

      test('should sign-in', async () => {
        const examplePage = getExamplePage();

        await examplePage.assertSignedIn();
      });

      test('should add an entry', async () => {
        const examplePage = getExamplePage();

        await examplePage.addEntry('My notes.');
      });

      test('should add an entry with file', async () => {
        const examplePage = getExamplePage();

        await examplePage.addEntryWithFile({
          text: 'My file.',
          filePath: 'e2e/data/dog.jpg'
        });

        await examplePage.assertUploadedImage();
      });

      const lastEntryText = 'My last note.';

      test('should add another entry', async () => {
        const examplePage = getExamplePage();

        await examplePage.addEntry(lastEntryText);
      });

      test('should delete entries', async () => {
        const examplePage = getExamplePage();

        await examplePage.deleteEntries();

        await examplePage.assertEntries(0);
      });

      test('should sign-out', async () => {
        const examplePage = getExamplePage();

        await examplePage.signOut();

        await examplePage.assertSignedOut();
      });

      // TODO: test does not seem to support setting dark or light mode so for now we just use screenshot of default mode

      test('match login screenshot', async () => {
        const examplePage = getExamplePage();

        await examplePage.assertSignedOut();

        await examplePage.assertScreenshot({mode: 'current', name: 'login'});
      });

      test('match logged in screenshot', async () => {
        const examplePage = getExamplePage();

        await examplePage.signIn();

        await examplePage.assertSignedIn();

        await examplePage.assertScreenshot({mode: 'current', name: 'logged-in'});
      });

      test('match modal screenshot', async () => {
        const examplePage = getExamplePage();

        await examplePage.openAddEntry();

        await examplePage.assertScreenshot({mode: 'current', name: 'modal'});

        await examplePage.closeAddEntryModal();
      });

      test('match logout screenshot', async () => {
        const examplePage = getExamplePage();

        await examplePage.signOut();

        await examplePage.assertSignedOut();

        await examplePage.assertScreenshot({mode: 'current', name: 'logout'});
      });
    });
  }
);
