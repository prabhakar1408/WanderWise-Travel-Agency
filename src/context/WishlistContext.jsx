import { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext(null)
const KEY = 'wanderwise-wishlist'

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      // storage unavailable
    }
  }, [items])

  const toggle = (k) =>
    setItems((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]))
  const has = (k) => items.includes(k)

  return (
    <WishlistContext.Provider value={{ items, toggle, has }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
