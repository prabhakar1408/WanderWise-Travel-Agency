import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users } from 'lucide-react'

export default function Hero() {
  const navigate = useNavigate()
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('2')

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/destinations?q=' + encodeURIComponent(place))
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <motion.img
        src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=80"
        alt="Santorini sunset"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy/80 via-navy/30 to-navy/85" />

      <div className="relative z-10 px-4 pt-28 pb-40 max-w-4xl w-full">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="uppercase tracking-[0.35em] text-xs sm:text-sm text-gold mb-5"
        >
          WanderWise Travel Agency
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-white text-5xl sm:text-6xl md:text-7xl leading-tight"
        >
          <span className="italic text-gold">Discover Your</span>
          <br />
          Dream Destination
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mt-6 h-px w-24 bg-gold"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-5 text-lg sm:text-xl text-white/90 tracking-wide"
        >
          Tailor-Made Luxury Travel Experiences
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 bg-white/10 backdrop-blur-xl border border-white/25 rounded-xl p-3 grid grid-cols-1 md:grid-cols-4 gap-3 shadow-2xl"
        >
          <label className="flex items-center gap-2 bg-white/95 rounded-lg px-4 py-3">
            <MapPin className="w-5 h-5 text-gold-dark shrink-0" />
            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Where to?"
              className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
            />
          </label>

          <label className="flex items-center gap-2 bg-white/95 rounded-lg px-4 py-3">
            <Calendar className="w-5 h-5 text-gold-dark shrink-0" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent outline-none text-slate-800"
            />
          </label>

          <label className="flex items-center gap-2 bg-white/95 rounded-lg px-4 py-3">
            <Users className="w-5 h-5 text-gold-dark shrink-0" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent outline-none text-slate-800"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold rounded-lg px-6 py-3 transition"
          >
            <Search className="w-5 h-5" /> Search
          </button>
        </motion.form>
      </div>

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-20 sm:h-28 z-10"
      >
        <path
          fill="#f6f1e8"
          d="M0,64 C240,120 480,0 720,40 C960,80 1200,110 1440,50 L1440,120 L0,120 Z"
        />
      </svg>
    </section>
  )
}
