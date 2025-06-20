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

interface Artists {
  href: string
  items: Artist[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

interface Result {
  artists: Artists
}

interface ExtraParams {
  duration: number | null
  bpm: number | null
  mood: string | null
  instruments: string[] | null
}

export const useMainStore = defineStore('main', () => {
  const isSearchingArtist = ref(false)
  const isGeneratingMusic = ref(false)
  const artistName = ref<string | null>()
  const extraParams = ref<ExtraParams>({
    duration: null,
    bpm: null,
    mood: null,
    instruments: null,
  })
  const artistData = ref<Artist | null>()
  const result = ref<Result | null>(null)
  const audioUrl = ref<string | null>(null)
  const bpm = ref<number | null>(null)
  const duration = ref<number>(20)

  const setArtistName = (artistInputName: string) => (artistName.value = artistInputName)

  const setExtraParams = (params: ExtraParams) => {
    extraParams.value.duration = params.duration
    extraParams.value.bpm = params.bpm
    extraParams.value.mood = params.mood
    extraParams.value.instruments = params.instruments
    console.log(extraParams)
  }

  const setBpm = (newBpm: number) => (bpm.value = newBpm)

  const setDuration = (newDuration: number) => (duration.value = newDuration)

  const searchArtist = async () => {
    if (artistName.value) {
      isSearchingArtist.value = true
      const { data } = await useFetch('/api/spotify', {
        method: 'POST',
        body: { artist: artistName },
      })

      result.value = data.value
      const artist = result.value?.artists?.items[0]
      artistData.value = artist ?? null

      if (artistData.value && artistData.value.genres.length === 0) {
        const { data: lastfmData } = await useFetch('/api/lastfm', {
          method: 'POST',
          body: { artist: artistData.value.name },
        })

        artistData.value.genres = lastfmData.value?.genres || []
      }
    }

    isSearchingArtist.value = false
  }

  const generateMusic = async () => {
    if (!artistData.value?.genres.length) return

    isGeneratingMusic.value = true

    const prompt = ref(artistData.value.genres.join(', ') + ' track')
    if (bpm.value) prompt.value += ` ${bpm.value} BPM`
    if (artistName.value) prompt.value += ` in the style of ${artistName.value}`
    console.log(prompt.value)

    const formData = new FormData()
    formData.append('prompt', prompt.value)
    formData.append('duration', duration.value.toString())

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

    const { storage, databases, ID, account } = useAppwrite()
    const currentUser = await account.get()
    const file = new File([blob], `track-${Date.now()}.wav`, { type: 'audio/wav' })
    const uploaded = await storage.createFile('tracks', ID.unique(), file, [
      `read("user:${currentUser.$id}")`,
      `write("user:${currentUser.$id}")`,
    ])
    const fileId = uploaded.$id
    await databases.createDocument(
      'genMusic',
      'tracks',
      ID.unique(),
      {
        userId: currentUser.$id,
        name: artistName.value,
        fileId,
        imageUrl: artistData.value.images[0].url,
        createdAt: new Date().toISOString(),
        description: '' + artistName.value + '' + bpm.value,
        genres: artistData.value.genres.join(', '),
      },
      [`read("user:${currentUser.$id}")`, `write("user:${currentUser.$id}")`]
    )

    isGeneratingMusic.value = false
  }

  return {
    isSearchingArtist,
    isGeneratingMusic,
    artistName,
    extraParams,
    artistData,
    audioUrl,
    bpm,
    duration,
    setArtistName,
    searchArtist,
    generateMusic,
    setExtraParams,
    setBpm,
    setDuration,
  }
})
