# AI Music Generator

A music generator based on the Meta MusicGen model

The bottom line is that the user enters the name of the artist / music group in whose style he wants to generate a track, then the Spotify API + LastFM API is used to get data about the artist, then the prompt is generated and a request is created for the backend (MusicGen model)

## Technology stack

- Frontend: Nuxt, TypeScript, Pinia, TailwindCSS, NuxtUI
- Backend: Python, AppWrite (authorization + database + storage)
- APIs: FastApi (python), Spotify API, LastFM API
