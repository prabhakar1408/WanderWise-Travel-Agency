import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { destinations } from '../data/destinations'
import { packages } from '../data/packages'
import DestinationCard from '../components/DestinationCard'
import PackageCard from '../components/PackageCard'

export default function Wishlist() {
  const { items } = useWishlist()
  const savedDest = destinations.filter((d) => items.includes('d-' + d.id))
  const savedPack = packages.filter((p) => items.includes('p-' + p.id))
  const empty = savedDest.length === 0 && savedPack.length === 0

  return (
    <>
      <section className="bg-navy pt-36 pb-20 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs text-gold">Your saved trips</p>
        <h1 className="font-serif text-5xl text-white mt-3">
          My <span className="italic text-gold">Wishlist</span>
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {empty ? (
          <div className="text-center py-16">
            <Heart className="w-14 h-14 text-gold mx-auto" />
            <h2 className="font-serif text-3xl text-navy mt-4">Your wishlist is empty</h2>
            <p className="text-slate-600 mt-2">Tap the heart on any destination or package to save it here.</p>
            <div className="flex justify-center gap-4 mt-8">
              <Link to="/destinations" className="bg-navy text-gold px-6 py-2.5 rounded-md font-semibold">Destinations</Link>
              <Link to="/packages" className="border border-navy text-navy px-6 py-2.5 rounded-md font-semibold">Packages</Link>
            </div>
          </div>
        ) : (
          <>
            {savedDest.length > 0 && (
              <>
                <h2 className="font-serif text-3xl text-navy mb-6">Saved Destinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                  {savedDest.map((d, i) => <DestinationCard key={d.id} d={d} index={i} />)}
                </div>
              </>
            )}
            {savedPack.length > 0 && (
              <>
                <h2 className="font-serif text-3xl text-navy mb-6">Saved Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {savedPack.map((p, i) => <PackageCard key={p.id} p={p} index={i} />)}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </>
  )
}
