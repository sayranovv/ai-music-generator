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
    <div class="mt-24 flex flex-col gap-4 items-center">
      <h1 class="text-center text-3xl text-primary-500 dark:text-primary-400 font-bold">
        Generate music by artist
      </h1>
      <UInput size="xl" highlight class="w-full" v-model="artist" />
      <UButton size="xl" class="w-full flex items-center justify-center" @click="onClick"
        >Generate music</UButton
      >
    </div>
    <Loader v-if="store.isGeneratingMusic" class="my-5" :type="'generation'" />
    <Loader v-if="store.isSearchingArtist" class="my-5" :type="'api-fetch'" />
    <div v-if="store.artistData" class="flex justify-between gap-5 my-8 items-stretch">
      <img :src="store.artistData?.images[0].url" alt="" class="w-1/3 rounded-md">
      <div class="w-2/3 flex flex-col justify-between items-start">
        <div>
          <p class="text-2xl font-bold text-rose-400">{{ store.artistData?.name }}</p>
          <p>{{ store.artistData?.genres.join(', ') }}</p>
        </div>
        <UButton :href="store.artistData?.href" class="w-full flex justify-center items-center">Open Spotify</UButton>
      </div>
    </div>
    <AudioPlayer v-if="store.audioUrl" class="mt-6 w-full" :src="store.audioUrl" />
  </div>
</template>
