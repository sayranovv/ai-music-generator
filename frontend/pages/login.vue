<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const authStore = useAuthStore()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (state.email && state.password) {
    authStore.loginUser(state.email, state.password)
  }
}

async function handleLogin() {
  try {
    const success = await authStore.loginUser(state.email, state.password)
    if (success) {
      navigateTo('/')
    }
  } catch (err) {
    error.value = err.message
  }
}

onMounted(() => {
  console.log(localStorage.getItem('user'))
})
</script>

<template>
  <div class="h-full pb-24 w-11/12 mx-auto flex flex-col justify-center">
    <header class="h-1/3 flex items-center justify-center">
      <h1 class="text-center text-3xl font-bold text-primary-500">Login</h1>
    </header>
    <div class="h-2/3 flex flex-col justify-between pb-3">
      <main>
        <UForm
          @submit="handleLogin"
          :schema="schema"
          :state="state"
          v-slot="{ errors }"
          class="space-y-2"
        >
          <UFormField label="Email" name="email">
            <UInput
              class="w-full"
              placeholder="Email"
              type="email"
              v-model="state.email"
              size="xl"
            />
          </UFormField>
          <UFormField label="Password" name="password">
            <UInput
              class="w-full"
              placeholder="Password"
              type="password"
              v-model="state.password"
              size="xl"
            />
          </UFormField>
          <UButton
            class="mt-3 w-full flex justify-center items-center cursor-pointer"
            label="Login"
            type="submit"
            size="xl"
            :disabled="Object.keys(errors).length > 0 || !state.email || !state.password"
          />
        </UForm>
        <UButton label="Logout" @click="authStore.logoutUser()" class="mt-2" />
        <p v-if="authStore.error" class="text-red-500 my-2 leading-4.5">{{ authStore.error }}</p>
      </main>
      <footer class="mx-auto">Lorem ipsum dolor sit amet</footer>
    </div>
  </div>
</template>
