<script setup lang="ts"></script>

<template>
  <div
    class="fixed sm:absolute bottom-0 right-0 flex justify-between bg-white/20 dark:bg-rose-300/20 backdrop-blur-2xl w-full px-16 py-5"
  >
    <NuxtLink to="/" class="flex flex-col items-center gap-1">
      <UIcon name="material-symbols:home-rounded" size="24" />
    </NuxtLink>
    <NuxtLink to="/trips">
      <UIcon name="material-symbols:home-rounded" class="" size="24" />
    </NuxtLink>
    <NuxtLink to="/profile">
      <UIcon name="material-symbols:home-rounded" class="" size="24" />
    </NuxtLink>
  </div>
</template>

<style scoped></style>
