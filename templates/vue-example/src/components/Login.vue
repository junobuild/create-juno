<script setup lang="ts">
import { signIn } from '@junobuild/core'
import Button from '@/components/Button.vue'

const login = async () => {
  await signIn()
}
</script>

<template>
  <Button @click="login" test-id="login-button">Sign in</Button>
</template>
