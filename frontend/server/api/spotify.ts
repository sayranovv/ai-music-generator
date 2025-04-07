import { defineEventHandler, readBody } from 'h3'
import { Buffer } from 'buffer'
import { process } from 'std-env'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const artistName = body.artist

  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const tokenData = await tokenRes.json()
  const accessToken = tokenData.access_token

  const searchRes = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const searchData = await searchRes.json()
  const artist = searchData.artists?.items?.[0]

  if (!artist) {
    throw createError({ statusCode: 404, statusMessage: 'Artist not found' })
  }

  return {
    searchData,
    name: artist.name,
    genres: artist.genres,
    image: artist.images?.[0]?.url || null,
  }
})
