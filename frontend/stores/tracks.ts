import { defineStore } from 'pinia'
import { Query } from 'appwrite'

export interface Track {
  name: string
  description: string
  imageUrl: string
  genres: string
  userId: string
  createdAt: string
  audioUrl?: string
}

export const useTracksStore = defineStore('tracksStore', () => {
  const tracks = ref<Track[] | null>(null)
  const isLoading = ref<boolean>(false)

  const getTracks = async () => {
    try {
      isLoading.value = true
      const { account, databases, storage } = useAppwrite()
      const currentUser = await account.get()
      const res = await databases.listDocuments('genMusic', 'tracks', [
        Query.equal('userId', currentUser.$id),
        Query.orderDesc('createdAt'),
      ])
      tracks.value = res.documents.map((doc: any) => ({
        ...doc,
        audioUrl: storage.getFileView('tracks', doc.fileId).toString(),
      }))
      console.log(tracks.value)
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    tracks,
    getTracks,
  }
})
