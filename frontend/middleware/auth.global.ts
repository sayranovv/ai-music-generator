export default defineNuxtRouteMiddleware(async to => {
  const authStore = useAuthStore()

  if (authStore.user) return

  try {
    await authStore.checkSession()

    if (authStore.user && to.path === '/login') {
      return navigateTo('/')
    }

    if (!authStore.user && to.path !== '/login') {
      return navigateTo('/login')
    }
  } catch (error) {
    console.error('Auth check failed:', error)
    if (to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})
