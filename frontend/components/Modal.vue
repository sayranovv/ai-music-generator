<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    class="absolute bg-black/50 backdrop-blur-md z-20 inset-0 w-full h-full flex items-center justify-center"
    @click.self="emit('close')"
  >
    <slot />
  </div>
</template>

<style scoped></style>
