<script setup lang="ts">
import type { PasskeyProgress } from '@/types/passkey.ts'
import { computed } from 'vue'
import {
  signIn,
  type SignProgress,
  type SignProgressFn,
  WebAuthnSignInProgressStep,
} from '@junobuild/core'
import Button from '@/components/Button.vue'
import Progress from '@/components/passkey/Progress.vue'

const { progress: wizardProgress, onProgress: wizardOnProgress } = defineProps<{
  progress: PasskeyProgress | undefined
  onProgress: (progress: PasskeyProgress | undefined) => void
}>()

const progress = computed<SignProgress<WebAuthnSignInProgressStep> | undefined | null>(() =>
  wizardProgress === undefined
    ? undefined
    : 'signIn' in wizardProgress
      ? wizardProgress.signIn
      : null,
)

const onProgress: SignProgressFn<WebAuthnSignInProgressStep> = (p) => {
  wizardOnProgress({ signIn: p })
}

const doSignIn = async () => {
  try {
    await signIn({
      webauthn: { options: { onProgress } },
    })
  } catch (error: unknown) {
    wizardOnProgress(undefined)

    throw error
  }
}
</script>

<template>
  <template v-if="progress === undefined">
    <p class="pt-6">Already got one set-up?</p>

    <Button @click="doSignIn">Use your passkey</Button>
  </template>

  <template v-else-if="progress !== null">
    <Progress>
      <span v-if="progress.step === WebAuthnSignInProgressStep.RequestingUserCredential">
        Requesting user credential...
      </span>
      <span v-else-if="progress.step === WebAuthnSignInProgressStep.FinalizingCredential">
        Finalizing credential...
      </span>
      <span v-else-if="progress.step === WebAuthnSignInProgressStep.Signing">
        Signing request...
      </span>
      <span v-else-if="progress.step === WebAuthnSignInProgressStep.FinalizingSession">
        Finalizing session...
      </span>
      <span v-else-if="progress.step === WebAuthnSignInProgressStep.RetrievingUser">
        Loading user...
      </span>
    </Progress>
  </template>
</template>
