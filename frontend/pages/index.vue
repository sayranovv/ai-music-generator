<script setup lang="ts">
import { useMainStore } from '~/stores/main'
import { useDebounce } from '@vueuse/core'

const store = useMainStore()

const artist = ref('')

const duration = ref<number | null>(null)
const bpm = ref<number | null>(null)
const mood = ref<string | null>(null)
const instruments = ref<string[]>([])

const debouncedArtist = useDebounce(artist, 300)

watch(debouncedArtist, val => store.setArtistName(val))

const onClick = async () => {
  await store.searchArtist()
  store.setExtraParams({
    duration: duration.value,
    bpm: bpm.value,
    mood: mood.value,
    instruments: instruments.value,
  })
  await store.generateMusic()
}

watch(duration, () => {
  if (duration.value) {
    store.setDuration(duration.value)
    console.log(store.duration)
  }
})

watch(bpm, () => {
  if (bpm.value) {
    store.setBpm(bpm.value)
  }
})
</script>

<template>
  <div class="px-4 pb-24">
    <header class="pt-7 pb-5">
      <h1 class="text-center text-lg font-bold">NeuroBeats</h1>
    </header>
    <main class="mt-10 space-y-10">
      <UInput class="w-full" size="xl" highlight placeholder="Enter artist name" v-model="artist" />

      <div class="space-y-6">
        <section class="w-full space-y-2.5">
          <div class="flex justify-between items-center">
            <p class="font-medium">BPM</p>
            <p>{{ bpm || 120 }}</p>
          </div>
          <USlider
            v-model="bpm"
            :default-value="120"
            :min="60"
            :max="180"
            :step="5"
            class="cursor-pointer"
          />
        </section>

        <section class="w-full space-y-2.5">
          <div class="flex justify-between items-center">
            <p class="font-medium">Duration (sec)</p>
            <p>{{ duration || 10 }}</p>
          </div>
          <USlider
            v-model="duration"
            :default-value="10"
            :min="5"
            :max="30"
            class="cursor-pointer"
          />
        </section>

        <!--        <section class="w-full flex items-center justify-between gap-3">-->
        <!--          <label class="font-medium text-zinc-600 dark:text-zinc-300">Mood</label>-->
        <!--          <USelect-->
        <!--            v-model="mood"-->
        <!--            :items="['меланхолично', 'весело', 'агрессивно', 'романтично']"-->
        <!--            class="w-1/2 cursor-pointer"-->
        <!--            placeholder="Выбери"-->
        <!--          />-->
        <!--        </section>-->

        <!--        <section class="w-full flex items-start justify-between gap-3">-->
        <!--          <label class="font-medium text-zinc-600 dark:text-zinc-300 pt-1">Instruments</label>-->
        <!--          <USelectMenu-->
        <!--            v-model="instruments"-->
        <!--            :items="['гитара', 'пианино', 'ударные', 'синтезатор']"-->
        <!--            multiple-->
        <!--            class="w-1/2 cursor-pointer"-->
        <!--            placeholder="Выбери инструменты"-->
        <!--          />-->
        <!--        </section>-->
      </div>

      <UButton
        size="xl"
        class="w-full flex items-center justify-center cursor-pointer"
        @click="onClick"
        :disabled="!artist"
        >Generate</UButton
      >
    </main>

    <Transition name="fade">
      <Modal v-if="store.isSearchingArtist">
        <Loader :type="'api-fetch'" />
      </Modal>
    </Transition>

    <Transition name="fade">
      <Modal v-if="store.isGeneratingMusic">
        <Loader :type="'generation'" />
      </Modal>
    </Transition>

    <Transition name="fade">
      <Modal v-if="store.generationError" @close="store.generationError = null">
        <p class="text-red-500">{{ store.generationError }}</p>
      </Modal>
    </Transition>

    <AudioPlayer
      v-if="store.audioUrl && store.artistData"
      class="mt-6 w-full"
      :src="store.audioUrl"
      :cover="store.artistData?.images[0].url"
      :songName="store.artistData?.name"
      :genre="store.artistData?.genres.join(', ')"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
