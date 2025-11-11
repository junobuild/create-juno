import { addEventClick } from "../utils/utils.js";

export const renderLoginWithGoogle = (app) => {
  addEventClick({
    target: app,
    selector: "#loginWithGoogle",
    fn: showModal,
  });

  return `<button id="loginWithGoogle"
    class="flex w-fit  items-center gap-2 border-black dark:border-lavender-blue-500 border-[3px] transition-all rounded-xs py-1 px-8 my-2 font-semibold text-white bg-lavender-blue-500 dark:bg-black shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_#7888ff] hover:bg-lavender-blue-600 dark:hover:bg-lavender-blue-300 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]">
    Continue with Google
</button>

<div id="wizard" class="contents"></div>
`;
};

const closeModal = (modal) => (modal.innerHTML = "");

const showModal = () => {
  const modal = document.querySelector("#wizard");

  addEventClick({
    target: modal,
    selector: "#closeModal",
    fn: () => closeModal(modal),
  });

  modal.innerHTML = `<div class="animate-fade fixed inset-0 z-50 p-16 md:px-24 md:py-44" role="dialog">
      <div class="w-full max-w-md rounded-sm border-[3px] border-black bg-white px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]">
          <div class="flex items-start justify-between">
            <h2
              id="modalTitle"
              class="text-xl font-bold text-gray-900 sm:text-2xl"
            >
              Hey 👋
            </h2>
  
            <button
              type="button"
              id="closeModal"
              class="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div class="mt-4">
              <p class="pb-4">You can sign in with Google... but it requires a little setup 😉</p>
  
              <p class="pb-1">
                  Check out the
                  <a
                    href="https://juno.build/docs/build/authentication/google"
                    rel="noopener noreferrer"
                    target="_blank"
                    class="hover:text-lavender-blue-500 active:text-lavender-blue-400 inline-flex items-center gap-1 underline"
                  >
                      Juno authentication docs
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="currentColor"
                    >
                        <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                    </svg>
                  </a>
              </p>
          </div>
        </div>
    </div>

    <div class="fixed inset-0 z-40 bg-white/30 dark:bg-lavender-blue-200/40 flex items-center justify-center backdrop-blur-xl"></div>`;
};
