"use client";

import { Auth } from "@/components/auth";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Modal } from "@/components/modal";
import { Table } from "@/components/table";
import { initSatellite } from "@junobuild/core";
import { useEffect } from "react";
import { Banner } from "@/components/banner";

export default function Home() {
  useEffect(() => {
    (async () =>
      await initSatellite({
        workers: {
          auth: true,
        },
      }))();
  }, []);

  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        <Banner />

        <main className="mx-auto max-w-(--breakpoint-2xl) px-8 py-16 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]">
          <h1 className="text-5xl font-bold tracking-tight md:pt-24 md:text-6xl dark:text-white">
            Example App
          </h1>
          <p className="py-4 md:max-w-lg dark:text-white">
            Try out this demo app to discover{" "}
            <a
              href="https://juno.build"
              rel="noopener noreferrer"
              target="_blank"
              className="underline"
            >
              Juno
            </a>.
          </p>

          <Auth>
            <Table />

            <Modal />
          </Auth>
        </main>

        <Footer />

        <Background />
      </div>
    </>
  );
}
