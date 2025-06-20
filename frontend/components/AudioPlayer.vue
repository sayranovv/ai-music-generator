<script setup lang="ts">
defineProps<{
  src: string
  cover?: string
  songName: string
  genre: string
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const togglePlay = () => {
  if (!audioRef.value) return
  if (audioRef.value.paused) {
    audioRef.value.play()
    isPlaying.value = true
  } else {
    audioRef.value.pause()
    isPlaying.value = false
  }
}
</script>

<template>
  <a
    class="block w-full max-w-xl rounded-2xl bg-gray-100 dark:bg-rose-300/20 px-4 py-3"
    :href="src"
    download=""
  >
    <audio ref="audioRef" :src="src" @ended="isPlaying = false" />

    <div class="flex items-center justify-between gap-4">
      <NuxtImg v-if="cover" :src="cover" alt="123" class="w-1/5 rounded-lg" />
      <div class="w-3/5 overflow-hidden">
        <p class="font-bold w-full truncate">{{ songName }}</p>
        <p class="text-sm opacity-40 w-full text-nowrap truncate">{{ genre }}</p>
      </div>
      <button
        @click.prevent="togglePlay"
        class="w-1/5 text-primary-500 hover:text-primary-600 mt-1"
      >
        <UIcon
          :name="
            isPlaying
              ? 'material-symbols:pause-circle-rounded'
              : 'material-symbols:play-circle-rounded'
          "
          class="cursor-pointer !w-11 !h-11 text-rose-400"
        />
      </button>
    </div>
  </a>
</template>
