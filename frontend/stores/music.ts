import { defineStore } from 'pinia'

export const useMusicStore = defineStore('musicStore', () => {
  const artistData = ref(null as any | null)
  const generatedMusic = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref(null as string | null)

  const setArtistData = (data: any) => (artistData.value = data)
  const setGeneratedMusic = (music: any) => (generatedMusic.value = music)
  const setLoading = (isLoad: boolean) => (isLoading.value = isLoad)
  const setError = (e: string) => (error.value = e)

  return {
    artistData,
    generatedMusic,
    isLoading,
    error,
    setArtistData,
    setGeneratedMusic,
    setLoading,
    setError,
  }
})
