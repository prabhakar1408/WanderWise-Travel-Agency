import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'

export default function HeartButton({ itemKey, className = '' }) {
  const { has, toggle } = useWishlist()
  const saved = has(itemKey)

  return (
    <button
      type="button"
      onClick={() => toggle(itemKey)}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:scale-110 transition ${className}`}
    >
      <Heart className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-navy'}`} />
    </button>
  )
}
