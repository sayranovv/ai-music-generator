import { process } from 'std-env'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      appwriteEndpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID,
      appwriteProjectName: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_NAME,
    },
  },
})
