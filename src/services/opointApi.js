const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export async function searchOpoint({ token, body }) {
  const response = await fetch('/api/search/', {
    method: 'POST',
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const text = await response.text()
    try {
      const parsed = JSON.parse(text)
      if (parsed?.detail) {
        throw new Error(parsed.detail)
      }
    } catch {
      // fall through to generic error
    }
    throw new Error(text || `Request failed with status ${response.status}`)
  }

  return response.json()
}

