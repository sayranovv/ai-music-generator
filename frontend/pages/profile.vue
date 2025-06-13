<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const store = useAuthStore()

const onClick = () => store.logoutUser()
</script>

<template>
  <div class="h-full px-4 pb-24 flex flex-col">
    <header class="pt-7 pb-5">
      <h1 class="text-center text-lg font-bold">Profile</h1>
    </header>
    <main>
      <section>
        <h2 class="text-lg font-bold pt-4 pb-2">Account</h2>
        <div class="py-3">
          <p class="font-medium">Email</p>
          <p class="text-sm text-rose-200/50">
            {{ store.user?.email || 'Loading...' }}
          </p>
        </div>
        <div class="py-3">
          <p class="font-medium">User ID</p>
          <p class="text-sm text-rose-200/50">
            {{ store.user?.$id || 'Loading...' }}
          </p>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-bold pt-4 pb-2">Settings</h2>
        <div class="flex justify-between py-4">
          <p class="font-medium">Dark Theme</p>
          <USwitch size="xl" :default-value="true" />
        </div>
      </section>
    </main>
    <footer class="mt-auto">
      <UButton
        class="rounded-full text-white text-sm font-bold w-full flex justify-center cursor-pointer"
        label="Sign out"
        @click="onClick"
      />
    </footer>
  </div>
</template>
