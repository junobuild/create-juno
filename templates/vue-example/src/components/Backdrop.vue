<script setup lang="ts">
defineProps<{
  spinner?: boolean
}>()
</script>

<template>
  <div
    :class="{
      'backdrop-blur-sm': spinner === true,
      'backdrop-blur-xl': spinner !== true
    }"
    class="fixed inset-0 z-40 bg-white/30 flex items-center justify-center"
  >
    <div
      v-if="spinner"
      class="w-12 h-12 rounded-full animate-spin border-[3px] border-solid border-lavender-blue-600 border-t-transparent"
    ></div>
  </div>
</template>
