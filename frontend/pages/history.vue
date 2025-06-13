<script setup lang="ts"></script>

<template>
  <div class="px-4 pb-24">
    <header class="pt-7 pb-5">
      <h1 class="text-center text-lg font-bold">History</h1>
    </header>
    <main>
      <Card
        v-for="_ in 3"
        :genre="'Hip Hop'"
        :description="'Fun'"
        :name="'Kendrik Lamar'"
        :src="'123'"
        :img="'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQv4yQiFcphtUods_zlCDvULeK57_5FJ3vYG7Gx3xsZgpWeUb_5dgri-unmxPVTekoVrWeyxG0g9CpK7GbZ4bVhlQ'"
      />
    </main>
  </div>
</template>

<style scoped></style>
