<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { getCurrentUser } = useAuth()

onBeforeMount(() => {
  document.documentElement.classList.remove('light')
  document.documentElement.classList.add('dark')
})

onMounted(async () => {
  const promise = await getCurrentUser()
  console.log(promise)
})
</script>

<template>
  <UApp>
    <div
      class="sm:flex sm:justify-between sm:items-center sm:px-10 lg:px-24 2xl:justify-center 2xl:gap-20 sm:h-screen sm:bg-gradient-to-br sm:from-white sm:to-primary-100 dark:sm:from-primary-400 dark:sm:to-primary-800"
    >
      <div class="hidden sm:block w-1/2">
        <h1
          class="text-primary-500 dark:text-primary-950 sm:text-4xl lg:text-6xl sm:mb-32 2xl:pl-20"
        >
          <span class="font-bold"
            >NeuroBeats — <br />
            AI music generator</span
          >
          <br />
        </h1>
      </div>
      <div class="sm:w-1/2 sm:pr-10">
        <NuxtLayout class="sm:rounded-3xl sm:shadow-2xl sm:mx-auto overflow-hidden">
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </UApp>
</template>
