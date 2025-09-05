import { addEventClick } from "../utils/utils.js";
import { signIn, signUp } from "@junobuild/core";

export const renderPasskey = (app) => {
  const doSignUp = async () => {
    await signUp({
      webauthn: {},
    });
  };

  const doSignIn = async () => {
    await signIn({
      webauthn: {},
    });
  };

  addEventClick({
    target: app,
    selector: `#create-passkey`,
    fn: doSignUp,
  });

  addEventClick({
    target: app,
    selector: `#use-passkey`,
    fn: doSignIn,
  });

  return `<div>
    <p>
      First time here? Use your device (Face ID, Windows Hello, or screen
      lock) to get in.
    </p>

    <button id="create-passkey">Create a new passkey</button>
    
    <p class="pt-6">Already got one set-up?</p>

    <button id="use-passkey">Use your passkey</button>
</div>`;
};
