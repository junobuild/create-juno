import {testWithII} from '@dfinity/internet-identity-playwright';
import {initTestSuite} from "./utils/init.utils";

const getExamplePage = initTestSuite();

testWithII('should sign-in with a new user', async () => {
  const examplePage = getExamplePage();
});

testWithII('should sign-in with an existing user', async () => {
  const examplePage = getExamplePage();
});
