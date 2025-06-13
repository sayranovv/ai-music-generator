<script setup lang="ts">
defineProps<{
  genre: string
  name: string
  description: string
  src: string
  img: string
}>()
</script>

<template>
  <div class="flex justify-between items-center py-4">
    <div class="h-32 flex flex-col justify-between items-left">
      <div>
        <p class="text-sm text-rose-100/60">{{ genre }}</p>
        <p class="font-bold">{{ name }}</p>
        <p class="text-sm text-rose-100/60">{{ description }}</p>
      </div>
      <UButton
        class="bg-rose-300/20 hover:bg-rose-300/15 cursor-pointer text-white rounded-full flex justify-center items-center gap-0.5 w-fit pl-4 pr-3 py-1.5"
        size="lg"
      >
        <p>Play</p>
        <UIcon name="material-symbols:play-arrow-outline-rounded" size="20" />
      </UButton>
    </div>
    <NuxtImg :src="img" class="w-32 h-32 object-cover rounded-xl" />
  </div>
</template>

<style scoped></style>
