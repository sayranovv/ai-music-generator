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
  const artistName = ref<string | null>()
  const artistData = ref<Artist | null>()
  const result = ref<string>()
  const audioUrl = ref<string | null>(null)

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

  const generateMusic = async () => {
    if (!artistData.value?.genres.length) return

    const prompt = artistData.value.genres.join(', ')
    const formData = new FormData()
    formData.append('prompt', prompt)

    console.log('yup')

    const response = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      console.error('Music generation error')
      return
    }

    const blob = await response.blob()
    audioUrl.value = URL.createObjectURL(blob)
  }


  return {
    isLoading,
    artistName,
    artistData,
    audioUrl,
    setArtistName,
    searchArtist,
    generateMusic,
  }
})
