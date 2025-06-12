import { useAuthStore } from '~/stores/auth'
import { process } from 'std-env'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.checkSession()
  if (!authStore.user && process.client && to.path !== '/login') {
    console.log('auth middleware:', authStore.user)
    return navigateTo('/login')
  }
})
