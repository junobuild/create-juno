import {
  WebAuthnSignInProgressStep,
  SignProgress,
  WebAuthnSignUpProgressStep,
} from '@junobuild/core';

export type PasskeyProgress =
  | {
      signUp: SignProgress<WebAuthnSignUpProgressStep>;
    }
  | {
      signIn: SignProgress<WebAuthnSignInProgressStep>;
    }
  | { setup: null };
