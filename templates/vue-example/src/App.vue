<script setup lang="ts">
import Auth from './components/Auth.vue'
import Background from './components/Background.vue'
import Table from '@/components/Table.vue'
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'
import { initSatellite } from '@junobuild/core'
import Modal from '@/components/Modal.vue'
import Banner from '@/components/Banner.vue'

onMounted(
  async () =>
    await initSatellite({
      workers: {
        auth: true,
      },
    }),
)
</script>

<template>
  <div class="relative isolate min-h-[100dvh]">
    <Banner />

    <main
      class="mx-auto max-w-(--breakpoint-2xl) px-8 py-16 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]"
    >
      <h1 class="text-5xl font-bold tracking-tight md:pt-24 md:text-6xl dark:text-white">
        Example App
      </h1>
      <p class="py-4 md:max-w-lg dark:text-white">
        Explore this demo app built with Vue, Tailwind, and
        <a href="https://juno.build" rel="noopener noreferrer" target="_blank" class="underline">
          Juno</a
        >, showcasing a practical application of these technologies.
      </p>

      <Auth>
        <Table />

        <Modal />
      </Auth>
    </main>

    <Footer />

    <Background />
  </div>
</template>
