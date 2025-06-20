<script setup lang="ts">
defineProps<{
  genre: string
  name: string
  description: string
  src: string
  img: string
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
  <div class="flex justify-between items-center py-4">
    <audio ref="audioRef" :src="src" @ended="isPlaying = false" />
    <div class="h-32 flex flex-col justify-between items-left">
      <div>
        <p class="text-sm text-rose-100/60">{{ genre }}</p>
        <p class="font-bold">{{ name }}</p>
        <p class="text-sm text-rose-100/60">{{ description }}</p>
      </div>
      <UButton
        class="bg-rose-300/20 hover:bg-rose-300/15 cursor-pointer text-white rounded-full flex justify-center items-center gap-0.5 w-fit pl-4 pr-3 py-1.5"
        size="lg"
        @click="togglePlay"
      >
        <p>Play</p>
        <UIcon v-if="!isPlaying" name="material-symbols:play-arrow-outline-rounded" size="20" />
        <UIcon v-else name="material-symbols:pause-outline-rounded" size="20" />
      </UButton>
    </div>
    <NuxtImg :src="img" class="w-32 h-32 object-cover rounded-xl" />
  </div>
</template>

<style scoped></style>
