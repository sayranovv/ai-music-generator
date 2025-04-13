import { defineStore } from 'pinia'

interface Image {
  url: string
  height: number
  width: number
}

interface Artist {
  external_urls: {
    spotify: string
  }
  followers: {
    href: null
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export const useMainStore = defineStore('main', () => {
  const isLoading = ref(false)
  const artistName = ref<string | null>(null)
  const artistData = ref<string>()
  const result = ref<string>()

  const setArtistName = (artistInputName: string) => (artistName.value = artistInputName)

  const searchArtist = async () => {
    const { data } = await useFetch('/api/spotify', {
      method: 'POST',
      body: { artist: artistName },
    })
    result.value = data.value
    artistData.value = result.value?.artists?.items[0]
    console.log(artistData.value?.genres)
  }

  return {
    isLoading,
    artistName,
    artistData,
    setArtistName,
    searchArtist,
  }
})
