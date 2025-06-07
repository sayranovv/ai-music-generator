export default defineNuxtRouteMiddleware(async to => {
  const authStore = useAuthStore()
  const publicRoutes = ['/login', '/register', '/password-reset']

  await new Promise(resolve => {
    const unwatch = authStore.$subscribe(() => {
      if (!authStore.isLoading) {
        unwatch()
        resolve(null)
      }
    })
    if (!authStore.isLoading) resolve(null)
  })

  if (!authStore.user && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  if (authStore.user && publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})
