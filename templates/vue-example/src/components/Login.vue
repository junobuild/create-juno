<script setup lang="ts">
import { signIn } from '@junobuild/core'
import Button from '@/components/Button.vue'

const signInWithII = async () => {
  await signIn({
    internet_identity: {},
  })
}
</script>

<template>
  <Button @click="signInWithII">Continue with Internet Identity</Button>
</template>
