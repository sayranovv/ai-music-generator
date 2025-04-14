<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import { useDebounce } from '@vueuse/core'

const store = useMainStore()

const artist = ref('')

const debouncedArtist = useDebounce(artist, 300)

watch(debouncedArtist, (val) => store.setArtistName(val))

const onClick = async () => {
  await store.searchArtist()
  await store.generateMusic()
}
</script>

<template>
  <div class="h-full">
    <div class="mt-44 flex flex-col gap-4 items-center">
      <h1 class="text-center text-3xl text-primary-500 dark:text-primary-400 font-bold">
        Generate music by artist
      </h1>
      <UInput size="xl" highlight class="w-full" v-model="artist" />
      <UButton size="xl" class="w-full flex items-center justify-center" @click="onClick"
        >Generate music</UButton
      >
    </div>
    <audio v-if="store.audioUrl" controls class="mt-6 w-full">
      <source :src="store.audioUrl" type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
    <div class="mt-4">
      <pre class="text-blue-500">{{ store.artistData }}</pre>
    </div>
  </div>
</template>
