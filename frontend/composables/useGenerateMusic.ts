import { useMusicStore } from '~/stores/music'

export const useGenerateMusic = () => {
  const musicStore = useMusicStore()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getMusicByArtist = async (artistName: string) => {
    isLoading.value = true
    error.value = null

    try {
      const spotifyData = await $fetch('/api/spotify', {
        method: 'POST',
        body: { artist: artistName },
      })

      const items = spotifyData?.searchData?.artists?.items

      if (!items || items.length === 0) {
        throw new Error('Artist not found')
      }

      const genres = items[0].genres.slice(0, 3)

      musicStore.setArtistData(spotifyData)

      const res = await fetch('/api/generateMusic', {
        method: 'POST',
        body: new URLSearchParams({ prompt: genres.join(', ') }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      musicStore.setGeneratedMusic(url)
    } catch (err) {
      error.value = err.message || 'An error occurred'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    getMusicByArtist,
    generatedMusic: musicStore.generatedMusic,
  }
}
