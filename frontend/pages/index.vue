<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import { useDebounce } from '@vueuse/core'

const store = useMainStore()

const artist = ref('')

const duration = ref()
const bpm = ref<number | null>(null)
const mood = ref<string | null>(null)
const instruments = ref<string[]>([])

const debouncedArtist = useDebounce(artist, 300)

watch(debouncedArtist, val => store.setArtistName(val))

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

      <div class="p-5 rounded-lg bg-rose-50 dark:bg-gray-900 space-y-4 w-full max-w-xl">
        <h2 class="text-xl font-bold text-zinc-700 dark:text-zinc-200">Parameters</h2>

        <div class="flex items-center justify-between gap-3">
          <label class="text-sm font-medium text-zinc-600 dark:text-zinc-300">Длина трека</label>
          <ClientOnly>
            <USelect
                v-model="duration"
                :items="[5, 10, 15, 30]"
                class="w-1/2"
                placeholder="в секундах"
            />
          </ClientOnly>
        </div>

        <div class="flex items-center justify-between gap-3">
          <label class="text-sm font-medium text-zinc-600 dark:text-zinc-300">Темп (BPM)</label>
          <UInput v-model="bpm" type="number" class="w-1/2" placeholder="например, 120" />
        </div>

        <div class="flex items-center justify-between gap-3">
          <label class="text-sm font-medium text-zinc-600 dark:text-zinc-300">Настроение</label>
          <USelect
            v-model="mood"
            :items="['меланхолично', 'весело', 'агрессивно', 'романтично']"
            class="w-1/2"
            placeholder="Выбери"
          />
        </div>

        <div class="flex items-start justify-between gap-3">
          <label class="text-sm font-medium text-zinc-600 dark:text-zinc-300 pt-1"
            >Инструменты</label
          >
          <USelectMenu
            v-model="instruments"
            :items="['гитара', 'пианино', 'ударные', 'синтезатор']"
            multiple
            class="w-1/2"
            placeholder="Выбери инструменты"
          />
        </div>
      </div>

      <UButton size="xl" class="w-full flex items-center justify-center" @click="onClick"
        >Generate music</UButton
      >
    </div>
    <div v-if="store.artistData" class="flex justify-between gap-5 my-8 items-stretch">
      <img :src="store.artistData?.images[0].url" alt="" class="w-1/3 rounded-md" />
      <div class="w-2/3 flex flex-col justify-between items-start">
        <div>
          <p class="text-2xl font-bold text-rose-400">{{ store.artistData?.name }}</p>
          <p>{{ store.artistData?.genres.join(', ') }}</p>
        </div>
        <UButton :href="store.artistData?.href" class="w-full flex justify-center items-center"
          >Open Spotify</UButton
        >
      </div>
    </div>
    <Loader v-if="store.isSearchingArtist" class="my-5" :type="'api-fetch'" />
    <Loader v-if="store.isGeneratingMusic" class="my-5" :type="'generation'" />
    <AudioPlayer v-if="store.audioUrl" class="mt-6 w-full" :src="store.audioUrl" />
  </div>
</template>
