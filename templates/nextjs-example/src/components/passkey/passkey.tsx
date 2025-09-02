import { Button } from "@/components/button";
import { useState } from "react";
import { Backdrop } from "@/components/backdrop";
import { UsePasskey } from "@/components/passkey/use-passkey";
import { PasskeyProgress } from "@/types/passkey";
import { CreatePasskey } from "@/components/passkey/create-passkey";

export const Passkey = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [progress, setProgress] = useState<PasskeyProgress | undefined>(
    undefined,
  );

  const start = () => {
    setProgress(undefined);
    setShowModal(true);
  };

  const close = () => {
    setShowModal(false);
    setProgress(undefined);
  };

  const onProgress = (progress: PasskeyProgress | undefined) => {
    setProgress(progress);
  };

  return (
    <>
      <Button onClick={start}>Continue with Passkey</Button>

      {showModal ? (
        <>
          <div
            className="animate-fade fixed inset-0 z-50 p-16 md:px-24 md:py-44"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="w-full max-w-md rounded-sm border-[3px] border-black bg-white px-4 py-3 shadow-[5px_5px_0px_rgba(0,0,0,1)]">
              {progress === undefined && <div className="flex items-start justify-between">
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
                  disabled={progress !== undefined}
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
              </div>}

              <div className="mt-4">
                <CreatePasskey onProgress={onProgress} progress={progress} />

                <UsePasskey onProgress={onProgress} progress={progress} />
              </div>
            </div>
          </div>
          <Backdrop />
        </>
      ) : null}
    </>
  );
};
