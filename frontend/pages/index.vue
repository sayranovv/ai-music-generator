<script setup lang="ts">
import { ref } from 'vue'
import { useGenerateMusic } from '~/composables/useGenerateMusic'

const artistInput = ref('')
const { isLoading, error, getMusicByArtist, generatedMusic } = useGenerateMusic()

const onGenerateMusic = () => {
  if (artistInput.value) {
    getMusicByArtist(artistInput.value)
  }
}
</script>

<template>
  <div class="h-full">
    <div class="mt-44 flex flex-col gap-4 items-center">
      <h1 class="text-center text-3xl text-primary-500 dark:text-primary-400 font-bold">
        Generate music by artist
      </h1>
      <UInput size="xl" highlight class="w-full" v-model="artistInput" />

      <!-- Кнопка генерации музыки -->
      <UButton
        size="xl"
        class="w-full flex items-center justify-center"
        :disabled="isLoading"
        @click="onGenerateMusic"
      >
        Generate music
      </UButton>

      <!-- Индикация загрузки -->
      <div v-if="isLoading" class="text-center text-gray-500 mt-4">
        Generating music... Please wait.
      </div>

      <!-- Ошибка -->
      <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>

      <!-- Отображение сгенерированного аудио файла -->
      <div v-if="generatedMusic" class="mt-4">
        <h2 class="text-center text-2xl text-primary-500 dark:text-primary-400 font-semibold">
          Your Generated Music
        </h2>
        <audio controls class="w-full mt-2">
          <source :src="generatedMusic.url" type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Можете добавить свои стили */
</style>
