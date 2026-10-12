import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Plane, Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Tour Packages', path: '/packages' },
  { name: 'Cost Calculator', path: '/calculator' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'Travel Blog', path: '/blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { items } = useWishlist()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || !isHome || open

  const heart = (
    <Link to="/wishlist" aria-label="Wishlist" className="relative text-white hover:text-gold transition">
      <Heart className="w-6 h-6" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-gold text-navy text-xs font-bold flex items-center justify-center">
          {items.length}
        </span>
      )}
    </Link>
  )

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? 'bg-navy/90 backdrop-blur-lg border-b border-gold/30 shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl tracking-wide text-white">
          <Plane className="w-6 h-6 text-gold" />
          WanderWise
        </Link>

        <ul className="hidden xl:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.path}>
              <NavLink
                to={l.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                    isActive ? 'text-gold' : 'text-white/90'
                  }`
                }
              >
                {l.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-5">
          {heart}
          <Link
            to="/packages"
            className="border border-gold bg-gold/10 hover:bg-gold text-gold hover:text-navy text-sm font-semibold px-6 py-2.5 rounded-md transition"
          >
            Plan Your Trip
          </Link>
        </div>

        <div className="flex xl:hidden items-center gap-5">
          {heart}
          <button className="text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="xl:hidden border-t border-gold/20">
          <ul className="flex flex-col p-4 gap-3">
            {links.map((l) => (
              <li key={l.path}>
                <NavLink
                  to={l.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 font-medium ${isActive ? 'text-gold' : 'text-white/90'}`
                  }
                >
                  {l.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
