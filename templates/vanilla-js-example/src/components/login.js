import { signIn } from "@junobuild/core";
import { addEventClick } from "../utils/utils";

export const renderLogin = (app) => {
  const signInWithDev = async () => {
    // Sign in for local development and E2E only
    await signIn({
      dev: {},
    });
  };

  addEventClick({
    target: app,
    selector: "#login",
    fn: signInWithDev,
  });

  app.innerHTML = `<div class="gap flex flex-col w-fit">
    <button id="login"
      class="flex w-fit  items-center gap-2 border-black dark:border-lavender-blue-500 border-[3px] transition-all rounded-xs py-1 px-8 my-2 font-semibold text-white bg-lavender-blue-500 dark:bg-black shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_#7888ff] hover:bg-lavender-blue-600 dark:hover:bg-lavender-blue-300 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]">
      Sign in for dev
    </button>   
  </div>`;
};
