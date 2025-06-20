<script setup lang="ts">
import { useTracksStore } from '~/stores/tracks'

const tracksStore = useTracksStore()

onMounted(async () => {
  await tracksStore.getTracks()
})
</script>

<template>
  <div class="px-4 pb-24">
    <header class="pt-7 pb-5">
      <h1 class="text-center text-lg font-bold">History</h1>
    </header>
    <main>
      <Card
        v-if="tracksStore.tracks"
        v-for="track in tracksStore.tracks"
        :genre="track.genres"
        :description="track.description"
        :name="track.name"
        :src="track.audioUrl"
        :img="track.imageUrl"
      />
    </main>
  </div>
</template>

<style scoped></style>
