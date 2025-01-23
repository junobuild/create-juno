<script setup lang="ts">
import Auth from './components/Auth.vue'
import Background from './components/Background.vue'
import Table from '@/components/Table.vue'
import Footer from '@/components/Footer.vue'
import { onMounted } from 'vue'
import { initSatellite } from '@junobuild/core'
import Modal from '@/components/Modal.vue'

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
    <main
      class="mx-auto max-w-(--breakpoint-2xl) py-16 px-8 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]"
    >
      <h1 class="dark:text-white text-5xl md:text-6xl font-bold tracking-tight md:pt-24">
        Example App
      </h1>
      <p class="dark:text-white py-4 md:max-w-lg">
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
