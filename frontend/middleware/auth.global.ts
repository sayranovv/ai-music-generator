import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.checkSession()
  if (!authStore.user && to.path !== '/login') {
    console.log('auth middleware:', authStore.user)
    return navigateTo('/login')
  }
})
