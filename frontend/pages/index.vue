<script setup lang="ts">
import { useMainStore } from '~/stores/main'

const store = useMainStore()

const artist = ref('')
const result = ref()

const searchArtist = async () => {
  const { data } = await useFetch('/api/spotify', {
    method: 'POST',
    body: { artist: artist.value },
  })
  result.value = data.value
  console.log(result.value)
}
</script>

<template>
  <div class="h-full">
    <div class="mt-44 flex flex-col gap-4 items-center">
      <h1 class="text-center text-3xl text-primary-500 dark:text-primary-400 font-bold">
        Generate music by artist
      </h1>
      <UInput size="xl" highlight class="w-full" v-model="artist" />
      <UButton
          size="xl"
          class="w-full flex items-center justify-center"
          @click="store.searchArtist(artist)"
      >Generate music</UButton
      >
    </div>
    <div v-if="result" class="mt-4">
      <pre>{{ result?.artists?.items[0] }}</pre>
    </div>

    <div class="mt-4">
      <pre class="text-blue-500">{{ store.artistData }}</pre>
    </div>
  </div>
</template>
