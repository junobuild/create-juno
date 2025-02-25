<script setup lang="ts">
defineProps<{
  spinner?: boolean
}>()
</script>

<template>
  <div
    class="dark:bg-lavender-blue-200/40 fixed inset-0 z-40 flex items-center justify-center bg-white/30 backdrop-blur-xl"
  >
    <div
      v-if="spinner"
      class="border-lavender-blue-600 h-12 w-12 animate-spin rounded-full border-[3px] border-solid border-t-transparent"
    ></div>
  </div>
</template>
