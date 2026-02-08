<script setup lang="ts">
import { signIn } from '@junobuild/core'
import Button from '@/components/Button.vue'

const signInWithDev = async () => {
  // Sign in for local development and E2E only
  await signIn({
    dev: {},
  })
}
</script>

<template>
  <Button @click="signInWithDev">Sign in for dev</Button>
</template>
