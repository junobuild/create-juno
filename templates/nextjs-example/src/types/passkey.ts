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
    };

export interface PasskeyProps {
  progress: PasskeyProgress | undefined;
  onProgress: (progress: PasskeyProgress | undefined) => void;
}
