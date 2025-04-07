import { defineEventHandler, readBody, sendStream, createError } from 'h3'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { prompt } = body

  console.log('[generateMusic] prompt:', prompt)
  console.log('[generateMusic] Sending request to:', process.env.API_URL)

  if (!prompt) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prompt is required',
    })
  }

  const response = await fetch(`${process.env.API_URL}/generate`, {
    method: 'POST',
    body: new URLSearchParams({ prompt }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  console.log('[generateMusic] response.ok:', response.ok)
  console.log('[generateMusic] response.status:', response.status)

  if (!response.ok || !response.body) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Music generation failed',
    })
  }

  return sendStream(event, {
    stream: response.body,
    type: 'audio/mpeg',
  })
})
