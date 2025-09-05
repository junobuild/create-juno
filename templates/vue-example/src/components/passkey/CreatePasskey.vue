<script setup lang="ts">
import {
  type SignProgress,
  type SignProgressFn,
  signUp,
  WebAuthnSignUpProgressStep,
} from '@junobuild/core'
import type { PasskeyProgress } from '@/types/passkey.ts'
import { computed, ref } from 'vue'
import Button from '@/components/Button.vue'
import Progress from '@/components/passkey/Progress.vue'

type ProgressSignUp =
  | {
      state: 'init' | 'setup' | 'hidden'
    }
  | {
      state: 'progress'
      detail: SignProgress<WebAuthnSignUpProgressStep>
    }

const { progress: wizardProgress, onProgress: wizardOnProgress } = defineProps<{
  progress: PasskeyProgress | undefined
  onProgress: (progress: PasskeyProgress | undefined) => void
}>()

const progress = computed<ProgressSignUp>(() =>
  wizardProgress === undefined
    ? { state: 'init' }
    : 'signUp' in wizardProgress
      ? { state: 'progress', detail: wizardProgress.signUp }
      : 'setup' in wizardProgress
        ? { state: 'setup' }
        : { state: 'hidden' },
)

const inputText = ref('')

const goToSetup = () => {
  wizardOnProgress({ setup: null })
}

const onProgress: SignProgressFn<WebAuthnSignUpProgressStep> = (progress) =>
  wizardOnProgress({ signUp: progress })

const doSignUp = async () => {
  try {
    await signUp({
      webauthn: {
        options: {
          onProgress,
          ...(inputText.value !== '' && {
            passkey: { user: { displayName: inputText.value } },
          }),
        },
      },
    })
  } catch (error: unknown) {
    wizardOnProgress(undefined)

    throw error
  }
}
</script>

<template>
  <template v-if="progress.state === 'init'">
    <p>First time here? Use your device (Face ID, Windows Hello, or screen lock) to get in.</p>

    <Button @click="goToSetup">Create a new passkey</Button>
  </template>

  <template v-else-if="progress.state === 'setup'">
    <p>Want to give it a nickname so you'll spot it easily later?</p>

    <input
      class="mx-0 mt-2 mb-6 block w-full resize-none rounded-sm border-[3px] border-black bg-white px-3 py-1.5 text-base font-normal shadow-[5px_5px_0px_rgba(0,0,0,1)] focus:outline-hidden"
      placeholder="An optional nickname"
      v-model="inputText"
    />

    <Button @click="doSignUp">Create now</Button>
  </template>

  <template v-else-if="progress.state === 'progress'">
    <Progress>
      <span v-if="progress.detail.step === WebAuthnSignUpProgressStep.CreatingUserCredential">
        Creating user credential...
      </span>
      <span
        v-else-if="progress.detail.step === WebAuthnSignUpProgressStep.ValidatingUserCredential"
      >
        Validating user credential...
      </span>
      <span v-else-if="progress.detail.step === WebAuthnSignUpProgressStep.FinalizingCredential">
        Finalizing credential...
      </span>
      <span v-else-if="progress.detail.step === WebAuthnSignUpProgressStep.Signing">
        Signing request...
      </span>
      <span v-else-if="progress.detail.step === WebAuthnSignUpProgressStep.FinalizingSession">
        Finalizing session...
      </span>
      <span v-else-if="progress.detail.step === WebAuthnSignUpProgressStep.RegisteringUser">
        Registering user...
      </span>
    </Progress>
  </template>
</template>
