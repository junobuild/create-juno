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

  return `<div class="max-w-md dark:text-white">
    <p>
      First time here? Use your device (Face ID, Windows Hello, or screen
      lock) to get in.
    </p>

    <button id="create-passkey" class="flex items-center gap-2 border-black dark:border-lavender-blue-500 border-[3px] transition-all rounded-xs py-1 px-8 my-2 font-semibold text-white bg-lavender-blue-500 dark:bg-black shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_#7888ff] hover:bg-lavender-blue-600 dark:hover:bg-lavender-blue-300 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]">Create a new passkey</button>
    
    <p class="pt-6">Already got one set-up?</p>

    <button id="use-passkey" class="flex items-center gap-2 border-black dark:border-lavender-blue-500 border-[3px] transition-all rounded-xs py-1 px-8 my-2 font-semibold text-white bg-lavender-blue-500 dark:bg-black shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_#7888ff] hover:bg-lavender-blue-600 dark:hover:bg-lavender-blue-300 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]">Use your passkey</button>
</div>`;
};
