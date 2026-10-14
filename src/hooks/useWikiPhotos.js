import { useEffect, useState } from 'react'

const cache = {}

async function fetchPhotos(titles) {
  const need = [...new Set(titles)].filter((t) => !(t in cache))
  if (need.length) {
    try {
      const url =
        'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=960&titles=' +
        encodeURIComponent(need.join('|'))
      const res = await fetch(url)
      const json = await res.json()
      const q = json.query || {}
      const byTitle = {}
      Object.values(q.pages || {}).forEach((p) => {
        if (p.thumbnail) byTitle[p.title] = p.thumbnail.source
      })
      need.forEach((t) => {
        const n = (q.normalized || []).find((x) => x.from === t)
        const nt = n ? n.to : t
        const r = (q.redirects || []).find((x) => x.from === nt)
        cache[t] = byTitle[r ? r.to : nt] || null
      })
    } catch {
      // network problem, photos will just not show
    }
  }
  const out = {}
  titles.forEach((t) => {
    if (cache[t]) out[t] = cache[t]
  })
  return out
}

export function useWikiPhotos(titles) {
  const key = titles.join('|')
  const [photos, setPhotos] = useState({})

  useEffect(() => {
    let alive = true
    fetchPhotos(key ? key.split('|') : []).then((r) => {
      if (alive) setPhotos(r)
    })
    return () => {
      alive = false
    }
  }, [key])

  return photos
}
