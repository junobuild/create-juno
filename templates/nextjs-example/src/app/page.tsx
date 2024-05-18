'use client';

import {Auth} from '@/components/auth';
import {Background} from '@/components/background';
import {Footer} from '@/components/footer';
import {Modal} from '@/components/modal';
import {Table} from '@/components/table';
import {initSatellite} from '@junobuild/core-peer';
import {useEffect} from 'react';

export default function Home() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () =>
      await initSatellite({
        workers: {
          auth: true
        }
      }))();
  }, []);

  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        <main className="mx-auto max-w-screen-2xl py-16 px-8 md:px-24 tall:min-h-[calc(100dvh-128px)]">
          <h1 className="dark:text-white text-5xl md:text-6xl font-bold tracking-tight md:pt-24">
            Example App
          </h1>
          <p className="dark:text-white py-4 md:max-w-lg">
            Explore this demo app built with Next.js, Tailwind, and{' '}
            <a
              href="https://juno.build"
              rel="noopener noreferrer"
              target="_blank"
              className="underline">
              Juno
            </a>
            , showcasing a practical application of these technologies.
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
