<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import { setDoc, uploadFile } from '@junobuild/core'
import { nanoid } from 'nanoid'
import type { Note } from '@/types/note'
import Button from '@/components/Button.vue'
import Backdrop from '@/components/Backdrop.vue'

const showModal = ref(false)
const inputText = ref('')
const inputFile = ref<HTMLInputElement | null>(null)
const progress = ref(false)
const file = ref<File | undefined>(undefined)

const store = useAuthStore()
const { user } = storeToRefs(store)

const valid = computed(() => inputText.value !== '' && user !== undefined && user !== null)

const setShowModal = (value: boolean) => (showModal.value = value)
const setFile = (f: File | undefined) => (file.value = f)

const reload = () => {
  const event = new Event('reload')
  window.dispatchEvent(event)
}

const add = async () => {
  // Demo purpose therefore edge case not properly handled
  if (user.value === null || user.value === undefined) {
    return
  }

  progress.value = true

  try {
    let url

    if (file.value !== undefined) {
      const filename = `${user.value.key}-${file.value.name}`

      const { downloadUrl } = await uploadFile({
        collection: 'images',
        data: file.value,
        filename,
      })

      url = downloadUrl
    }

    const key = nanoid()

    await setDoc<Note>({
      collection: 'notes',
      doc: {
        key,
        data: {
          text: inputText.value,
          ...(url !== undefined && { url }),
        },
      },
    })

    setShowModal(false)

    reload()
  } catch (err) {
    console.error(err)
  }

  progress.value = false
}

const onChangeFile = ($event: Event) =>
  setFile(($event as unknown as { target: EventTarget & HTMLInputElement }).target?.files?.[0])

const openSelectFile = () => inputFile.value?.click()

const resetFileInput = () => {
  if (inputFile !== null && inputFile.value !== null) {
    inputFile.value.value = ''
  }

  file.value = undefined

  setFile(undefined)
}
</script>

<template>
  <Button
    @click="
      () => {
        resetFileInput()
        setShowModal(true)
      }
    "
  >
    Add an entry
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 -960 960 960"
      width="20"
      fill="currentColor"
    >
      <path d="M417-417H166v-126h251v-251h126v251h251v126H543v251H417v-251Z" />
    </svg>
  </Button>

  <div
    class="animate-fade fixed inset-0 z-50 p-16 md:px-24 md:py-44"
    role="dialog"
    v-if="showModal"
  >
    <div class="relative w-full max-w-xl">
      <textarea
        class="form-control m-0 block w-full resize-none rounded-xs border-[3px] border-black bg-white px-3 py-1.5 text-base font-normal shadow-[5px_5px_0px_rgba(0,0,0,1)] focus:outline-hidden"
        rows="{7}"
        placeholder="Your diary entry"
        v-model="inputText"
        :disabled="progress"
      ></textarea>

      <div role="toolbar" class="flex items-center justify-between">
        <div>
          <button
            aria-label="Attach a file to the entry"
            class="hover:text-lavender-blue-600 active:text-lavender-blue-400 flex items-center gap-2"
            @click="openSelectFile"
          >
            <svg
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 29 29"
              fill="currentColor"
            >
              <g>
                <rect fill="none" class="opacity-25" width="29" height="29" />
                <path
                  d="M8.36,26.92c-2,0-3.88-.78-5.29-2.19C.15,21.81.15,17.06,3.06,14.14L12.57,4.64c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41L4.48,15.56c-2.14,2.14-2.14,5.62,0,7.76,1.04,1.04,2.41,1.61,3.88,1.61s2.84-.57,3.88-1.61l12.79-12.79c1.47-1.47,1.47-3.87,0-5.34-1.47-1.47-3.87-1.47-5.34,0l-12.45,12.45c-.73.73-.73,1.91,0,2.64.73.73,1.91.73,2.64,0l9.17-9.17c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-9.17,9.17c-1.51,1.51-3.96,1.51-5.47,0-1.51-1.51-1.51-3.96,0-5.47L18.26,3.77c2.25-2.25,5.92-2.25,8.17,0s2.25,5.92,0,8.17l-12.79,12.79c-1.41,1.41-3.29,2.19-5.29,2.19Z"
                />
              </g>
            </svg>
            <span class="max-w-48 truncate">
              <small>{{ file !== undefined ? file.name : 'Attach file' }}</small>
            </span>
          </button>

          <input
            type="file"
            class="fixed right-0 -bottom-24 opacity-0"
            @change="onChangeFile"
            :disabled="progress"
            ref="inputFile"
          />
        </div>

        <div
          class="my-8 inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-indigo-600"
          role="status"
          aria-label="loading"
          v-if="progress"
        >
          <span class="sr-only">Loading...</span>
        </div>

        <div class="my-4 flex" v-if="!progress">
          <button
            class="hover:text-lavender-blue-600 active:text-lavender-blue-400 px-8 py-1"
            type="button"
            @click="() => setShowModal(false)"
          >
            Close
          </button>

          <Button @click="add" :disabled="!valid"> Submit </Button>
        </div>
      </div>
    </div>
  </div>
  <Backdrop v-if="showModal" :spinner="false" />
</template>
