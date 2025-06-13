<script lang="ts"></script>

<template>
  <div class="relative bg-white dark:bg-black sm:w-96 h-dvh sm:h-[700px] flex flex-col">
    <div class="overflow-y-auto flex-1">
      <slot />
    </div>
    <Navbar />
  </div>
</template>

<style scoped></style>
