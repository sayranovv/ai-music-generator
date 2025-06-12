<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div
    class="fixed sm:absolute bottom-0 right-0 flex justify-between bg-white/20 dark:bg-rose-300/20 backdrop-blur-2xl w-full px-16 pt-2 pb-3 border-t border-t-rose-300/30"
  >
    <NuxtLink to="/" class="flex flex-col items-center justify-center gap-1 w-10">
      <UIcon v-if="route.path === '/'" name="material-symbols:home-rounded" size="28" />
      <UIcon
        v-else
        name="material-symbols:home-outline-rounded"
        class="text-rose-100/60"
        size="28"
      />
      <p class="font-medium text-xs" :class="{ 'text-rose-100/60': route.path !== '/' }">Home</p>
    </NuxtLink>
    <NuxtLink to="/history" class="flex flex-col items-center justify-center gap-1 w-10">
      <UIcon
        name="material-symbols:history-rounded"
        :class="{ 'text-rose-100/60': route.path !== '/history' }"
        size="28"
      />
      <p class="font-medium text-xs" :class="{ 'text-rose-100/60': route.path !== '/history' }">
        History
      </p>
    </NuxtLink>
    <NuxtLink to="/profile" class="flex flex-col items-center justify-center gap-1 w-10">
      <UIcon v-if="route.path === '/profile'" name="material-symbols:person-rounded" size="28" />
      <UIcon
        v-else
        name="material-symbols:person-outline-rounded"
        class="text-rose-100/60"
        size="28"
      />
      <p class="font-medium text-xs" :class="{ 'text-rose-100/60': route.path !== '/profile' }">
        Profile
      </p>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
