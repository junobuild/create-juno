import { Button } from "@/components/button";
import { Backdrop } from "@/components/backdrop";
import { useState } from "react";

export const LoginWithGoogle = () => {
  const [showModal, setShowModal] = useState(false);

  const start = () => {
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={start}>Continue with Google</Button>

      {showModal ? (
        <>
          <div
            className="animate-fade fixed inset-0 z-50 p-16 md:px-24 md:py-44"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="w-full max-w-md rounded-sm border-[3px] border-black bg-white px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start justify-between">
                <h2
                  id="modalTitle"
                  className="text-xl font-bold text-gray-900 sm:text-2xl"
                >
                  Hey 👋
                </h2>

                <button
                  type="button"
                  className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
                  aria-label="Close"
                  onClick={close}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4">
                <p className="pb-4">
                  You can sign in with Google... but it requires a little setup
                  😉
                </p>

                <p className="pb-1">
                  Check out the{" "}
                  <a
                    href="https://juno.build/docs/build/authentication/google"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-lavender-blue-500 active:text-lavender-blue-400 inline-flex items-center gap-1 underline"
                  >
                    Juno authentication docs{" "}
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
          <Backdrop />
        </>
      ) : null}
    </>
  );
};
