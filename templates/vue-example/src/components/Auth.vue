<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import LoginWithII from './LoginWithII.vue'
import Passkey from './passkey/Passkey.vue'
import Logout from './Logout.vue'
import LoginWithGoogle from '@/components/LoginWithGoogle.vue'

const store = useAuthStore()
const { user } = storeToRefs(store)
</script>

<template>
  <template v-if="user !== undefined && user !== null">
    <div>
      <slot />

      <Logout />
    </div>
  </template>

  <template v-else>
    <div class="gap flex flex-col">
      <LoginWithGoogle />

      <Passkey />

      <LoginWithII />
    </div>
  </template>
</template>
