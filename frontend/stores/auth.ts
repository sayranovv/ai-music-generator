import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import type { Models } from 'appwrite'

export const useAuthStore = defineStore('authStore', () => {
  const { getCurrentUser, login, logout } = useAuth()

  const user = ref<Models.User<Models.Preferences> | null>(null)
  const isLoading = ref(false)
  const error = ref()

  async function checkSession() {
    isLoading.value = true
    try {
      user.value = await getCurrentUser()
      error.value = null
    } catch {
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function loginUser(email: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      await login(email, password)
      user.value = await getCurrentUser()
      navigateTo('/')
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      isLoading.value = false
    }
  }

  async function logoutUser() {
    await logout()
    user.value = null
    navigateTo('/login')
  }

  return { user, isLoading, error, checkSession, loginUser, logoutUser }
})
