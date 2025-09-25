"use client";

import { Article } from "@/components/article";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { initSatellite } from "@junobuild/core";
import { useEffect } from "react";

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
    <div className="relative isolate min-h-[100dvh]">
      <main className="mx-auto max-w-(--breakpoint-2xl) px-8 py-16 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]">
        <h1 className="text-5xl font-extrabold md:pt-16 md:text-6xl dark:text-white">
          Welcome to Juno
        </h1>

        <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-8">
          <Hero
            href="https://juno.build/docs/add-juno-to-an-app/create-a-satellite"
            ariaLabel="Discover how to create a Satellite and deploy your project to production"
          >
            Not yet live? Launch your Satellite
          </Hero>

          <Article
            href="https://juno.build/docs/guides/nextjs"
            ariaLabel="Open quickstart guides on Juno's website"
            title="Quickstart"
          >
            Discover how to use Next.js with Juno.
          </Article>

          <Article
            href="https://juno.build/docs/category/build"
            ariaLabel="Open the list of features for building apps on Juno's website"
            title="Documentation"
          >
            Learn how Juno works and start building rich features.
          </Article>

          <Article
            href="https://juno.build/docs/guides/github-actions"
            ariaLabel="Open the guide to setting up GitHub Actions for Juno"
            title="Continuous Integration"
          >
            Automate your deployment with GitHub Actions.
          </Article>

          <Article
            href="https://discord.gg/wHZ57Z2RAG"
            ariaLabel="Join Juno's Discord channel for questions or to share the fun"
            title="Community"
          >
            Come say hi to our amazing Discord community. ❤️
          </Article>
        </div>
      </main>

      <Footer />

      <Background />
    </div>
  );
}
