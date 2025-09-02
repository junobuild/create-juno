import {
  WebAuthnSignInProgressStep,
  WebAuthnSignProgress,
  WebAuthnSignUpProgressStep,
} from "@junobuild/core";

export type PasskeyProgress =
  | {
      signUp: WebAuthnSignProgress<WebAuthnSignUpProgressStep>;
    }
  | {
      signIn: WebAuthnSignProgress<WebAuthnSignInProgressStep>;
    }
  | { setup: null };

export interface PasskeyProps {
  progress: PasskeyProgress | undefined;
  onProgress: (progress: PasskeyProgress | undefined) => void;
}
