import { initSatellite } from "@junobuild/core";
import { FC, useEffect, useState } from "react";
import { Onboarding } from "./components/Onboarding";
import { Auth } from "./components/Auth";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";
import { Background } from "./components/Background";
import { Footer } from "./components/Footer";

const App: FC = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    (async () =>
      await initSatellite({
        workers: {
          auth: true,
        },
      }))();
  }, []);

  return (
    <div className="relative isolate min-h-[100dvh]">
      <main className="mx-auto max-w-(--breakpoint-2xl) px-8 py-16 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]">
        <Onboarding
          onComplete={(completed: boolean) => setOnboardingCompleted(completed)}
        />

        {(onboardingCompleted || !import.meta.env.DEV) && (
          <>
            <h1 className="text-5xl font-bold tracking-tight md:pt-24 md:text-6xl dark:text-white">
              Example App
            </h1>

            <p className="py-4 md:max-w-lg dark:text-white">
              Sign-in to explore this demo app built with React, Tailwind, and{" "}
              <a
                href="https://juno.build"
                rel="noopener noreferrer"
                target="_blank"
                className="underline"
              >
                Juno
              </a>
              .
            </p>

            <Auth>
              <Table />

              <Modal />
            </Auth>
          </>
        )}
      </main>

      <Footer />

      <Background />
    </div>
  );
};

export default App;
