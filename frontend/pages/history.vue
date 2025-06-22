<script setup lang="ts">
import { useTracksStore } from '~/stores/tracks'

const tracksStore = useTracksStore()

onMounted(async () => await tracksStore.getTracks())
</script>

<template>
  <div class="px-4 pb-24">
    <header class="pt-7 pb-5">
      <h1 class="text-center text-lg font-bold">History</h1>
    </header>
    <main>
      <Transition name="fade" v-if="tracksStore.tracks">
        <div>
          <Card
            v-if="tracksStore.tracks"
            v-for="track in tracksStore.tracks"
            :genre="track.genres"
            :description="track.description"
            :name="track.name"
            :src="track.audioUrl"
            :img="track.imageUrl"
          />
        </div>
      </Transition>
      <Transition name="fade" v-else-if="!tracksStore.isLoading">
        <p class="text-center">No tracks</p>
      </Transition>
    </main>
    <Transition name="fade">
      <Loader
        v-if="tracksStore.isLoading"
        class="absolute w-full flex"
        :class="{
          'top-7 right-10 justify-end': tracksStore.tracks > 0,
          'inset-0 justify-center items-center': tracksStore.tracks === 0,
        }"
        :type="'default'"
      />
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
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
