import { defineEventHandler, readBody } from 'h3'
import {process} from "std-env";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const artistName = body.artist

  if (!artistName) {
    return { error: 'Artist name is required' }
  }

  const apiKey = process.env.LASTFM_API_KEY
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
      artistName
    )}&api_key=${apiKey}&format=json`
  )

  const data = await response.json()

  if (data?.error || !data?.artist?.tags?.tag) {
    return { genres: [] }
  }

  const genres = data.artist.tags.tag.map((tag: any) => tag.name)
  return { genres }
})
