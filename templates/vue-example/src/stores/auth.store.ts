import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { onAuthStateChange, type User } from '@junobuild/core'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null | undefined> = ref(undefined)

  const unsubscribe = onAuthStateChange((u) => (user.value = u))

  return { user, unsubscribe }
})
