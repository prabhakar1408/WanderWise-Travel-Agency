import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plane, Mail, Phone, MapPin, Clock, Send, Globe, MessageCircle, Camera, ArrowUp } from 'lucide-react'

const india = ['Kashmir', 'Ladakh', 'Manali', 'Kasol', 'Andaman', 'Shimla', 'Goa']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setDone(true)
    setEmail('')
  }

  const social = [
    { icon: Camera, label: 'Instagram' },
    { icon: MessageCircle, label: 'WhatsApp' },
    { icon: Globe, label: 'Website' },
    { icon: Mail, label: 'Email' },
  ]

  return (
    <footer className="bg-navy text-white/70 border-t-2 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-white font-serif text-2xl">
            <Plane className="w-6 h-6 text-gold" /> WanderWise
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-sm">
            Tailor-made travel experiences across India and the world. From Himalayan valleys and island beaches to
            cultural city breaks, we plan it so you can enjoy it.
          </p>
          <div className="flex gap-3 mt-5">
            {social.map((s) => (
              <a
                key={s.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <h4 className="text-white font-serif text-lg mt-8 mb-3">Newsletter</h4>
          {done ? (
            <p className="text-gold text-sm">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={subscribe} className="flex gap-2 max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full min-w-0 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none focus:border-gold"
              />
              <button className="flex items-center gap-1 bg-gold hover:bg-gold-dark text-navy font-semibold text-sm px-4 rounded-md transition">
                <Send className="w-4 h-4" /> Join
              </button>
            </form>
          )}
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/destinations" className="hover:text-gold">Destinations</Link></li>
            <li><Link to="/packages" className="hover:text-gold">Tour Packages</Link></li>
            <li><Link to="/map" className="hover:text-gold">Interactive Map</Link></li>
            <li><Link to="/planner" className="hover:text-gold">AI Trip Planner</Link></li>
            <li><Link to="/calculator" className="hover:text-gold">Cost Calculator</Link></li>
            <li><Link to="/wishlist" className="hover:text-gold">Wishlist</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Travel Blog</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-4">Top in India</h4>
          <ul className="space-y-2 text-sm">
            {india.map((p) => (
              <li key={p}>
                <Link to={'/destinations?q=' + p} className="hover:text-gold">{p}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-lg mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" /> hello@wanderwise.com</li>
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-gold shrink-0" /> +91 00000 00000</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" /> Meerut, Uttar Pradesh, India</li>
            <li className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 text-gold shrink-0" /> Mon - Sat, 10 AM to 7 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p>© {new Date().getFullYear()} WanderWise Travel Agency. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 text-gold hover:text-white transition"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
