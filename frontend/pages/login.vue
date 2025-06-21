<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import * as z from 'zod'
import { definePageMeta } from '#imports'
import type { TabsItem } from '@nuxt/ui'

definePageMeta({
  layout: 'empty',
})

const authStore = useAuthStore()

const tabsItems: TabsItem[] = [
  {
    label: 'Login',
    slot: 'login' as const,
  },
  {
    label: 'Register',
    slot: 'register' as const,
  },
]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

async function handleLogin() {
  try {
    await authStore.loginUser(state.email, state.password)
  } catch (err) {
    console.error(err)
  }
}

const handleRegister = async () => {
  try {
    await authStore.registerUser(state.email, state.password)
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  console.log(localStorage.getItem('user'))
})
</script>

<template>
  <div class="h-full px-4 pb-4 flex flex-col">
    <header class="pt-7 pb-5">
      <h1 class="text-center text-lg font-bold">Welcome</h1>
    </header>
    <main>
      <UTabs :items="tabsItems" class="mt-3 w-full">
        <template #login="{ item }">
          <UForm
            @submit="handleLogin"
            :schema="schema"
            :state="state"
            v-slot="{ errors }"
            class="pt-2 space-y-4"
          >
            <UFormField name="email">
              <UInput
                class="w-full"
                placeholder="Email"
                type="email"
                v-model="state.email"
                size="xl"
              />
            </UFormField>
            <UFormField name="password">
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
          <p v-if="authStore.error" class="text-red-500 my-2 leading-4.5">
            {{ authStore.error }}
          </p>
        </template>

        <template #register="{ item }">
          <UForm
            @submit="handleRegister"
            :schema="schema"
            :state="state"
            v-slot="{ errors }"
            class="pt-2 space-y-4"
          >
            <UFormField name="email">
              <UInput
                class="w-full"
                placeholder="Email"
                type="email"
                v-model="state.email"
                size="xl"
              />
            </UFormField>
            <UFormField name="password">
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
        </template>
      </UTabs>
    </main>
    <footer class="mx-auto mt-auto">tg: @sayranovv</footer>
  </div>
</template>
