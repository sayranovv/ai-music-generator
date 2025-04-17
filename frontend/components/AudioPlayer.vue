<script setup lang="ts">
defineProps<{
  src: string | null
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

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

const updateTime = () => {
  if (!audioRef.value) return
  currentTime.value = audioRef.value.currentTime
  duration.value = audioRef.value.duration
}

const onSeek = (e: Event) => {
  const input = e.target as HTMLInputElement
  const seekTime = Number(input.value)
  if (audioRef.value) {
    audioRef.value.currentTime = seekTime
  }
}
</script>

<template>
  <div class="w-full max-w-xl rounded-2xl bg-gray-100 dark:bg-gray-900 p-4">
    <audio
        ref="audioRef"
        :src="src"
        @timeupdate="updateTime"
        @loadedmetadata="updateTime"
        @ended="isPlaying = false"
    />

    <div class="flex items-center justify-between mb-2">
      <button @click="togglePlay" class="text-primary-500 hover:text-primary-600">
        <UIcon :name="isPlaying ? 'i-heroicons-pause' : 'i-heroicons-play'" class="w-8 h-8" />
      </button>

      <a :href="src" download class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
        <UIcon name="i-heroicons-arrow-down-tray" class="w-6 h-6" />
      </a>
    </div>

    <input
        type="range"
        class="w-full accent-primary-500"
        min="0"
        :max="duration"
        step="0.1"
        :value="currentTime"
        @input="onSeek"
    />

    <div class="text-sm text-gray-500 mt-1 flex justify-between">
      <span>{{ currentTime.toFixed(0) }}s</span>
      <span>{{ duration.toFixed(0) }}s</span>
    </div>
  </div>
</template>
