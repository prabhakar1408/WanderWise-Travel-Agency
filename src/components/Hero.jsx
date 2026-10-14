import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Compass, Briefcase, BadgePercent, Smile, Headphones } from 'lucide-react'
import { destinations } from '../data/destinations'

const pills = [
  { icon: BadgePercent, text: 'Best prices', shift: '0rem' },
  { icon: Smile, text: 'Trip for all tastes', shift: '3rem' },
  { icon: Compass, text: 'Local guides', shift: '0.5rem' },
  { icon: Headphones, text: 'Friendly support', shift: '3.5rem' },
]

const types = ['Beach', 'Mountain', 'City', 'Culture', 'Adventure']

export default function Hero() {
  const navigate = useNavigate()
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('2')
  const [type, setType] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const q = new URLSearchParams()
    if (place) q.set('q', place)
    if (type) q.set('tag', type)
    navigate('/destinations?' + q.toString())
  }

  const field = 'flex items-center gap-3 px-5 py-3 lg:border-r lg:border-slate-200'
  const label = 'block text-[11px] uppercase tracking-widest text-neutral-500'
  const control = 'w-full bg-transparent outline-none text-slate-800 text-sm font-medium'

  return (
    <section className="bg-navy pt-24 pb-16 px-3 sm:px-5">
      <div className="relative max-w-375 mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden border-[6px] border-white min-h-140 lg:min-h-160 flex items-center">
          <motion.img
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=80"
            alt="Santorini"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-navy/85 via-navy/45 to-navy/10" />

          <div className="relative z-10 w-full px-6 sm:px-14 py-20 pb-28 lg:pb-32">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-white text-6xl sm:text-7xl lg:text-8xl leading-[1.05]"
            >
              Your Trip
              <br />
              Starts <span className="italic text-gold">Here</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 max-w-md text-lg text-white/90"
            >
              Explore curated trips, unique experiences and unforgettable destinations. Travel smarter, deeper and more inspired.
            </motion.p>
          </div>

          <div className="hidden lg:block absolute right-[7%] top-[30%] z-10">
            {pills.map((p, i) => (
              <motion.div
                key={p.text}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{
                  opacity: { delay: 0.6 + i * 0.15 },
                  x: { delay: 0.6 + i * 0.15 },
                  y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{ marginLeft: p.shift }}
                className="mb-5 w-fit flex items-center gap-2 rounded-full border-2 border-white/70 bg-white/10 backdrop-blur px-5 py-2 text-white text-sm"
              >
                <p.icon className="w-4 h-4 text-gold" /> {p.text}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="relative z-20 mt-4 lg:mt-0 lg:absolute lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 lg:translate-y-1/2 w-full lg:w-[92%] rounded-3xl lg:rounded-full bg-white/95 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr_auto] items-center py-2 pl-2 pr-2 lg:pr-3"
        >
          <label className={field}>
            <MapPin className="w-5 h-5 text-gold-dark shrink-0" />
            <span className="block w-full">
              <span className={label}>Where to</span>
              <input
                list="places-list"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Kashmir, Bali..."
                className={control}
              />
              <datalist id="places-list">
                {destinations.map((d) => (
                  <option key={d.id} value={d.name} />
                ))}
              </datalist>
            </span>
          </label>

          <label className={field}>
            <Calendar className="w-5 h-5 text-gold-dark shrink-0" />
            <span className="block w-full">
              <span className={label}>Date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={control} />
            </span>
          </label>

          <label className={field}>
            <Users className="w-5 h-5 text-gold-dark shrink-0" />
            <span className="block w-full">
              <span className={label}>Guests</span>
              <select value={guests} onChange={(e) => setGuests(e.target.value)} className={control}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </span>
          </label>

          <label className={field}>
            <Briefcase className="w-5 h-5 text-gold-dark shrink-0" />
            <span className="block w-full">
              <span className={label}>Trip type</span>
              <select value={type} onChange={(e) => setType(e.target.value)} className={control}>
                <option value="">Any type</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </span>
          </label>

          <button
            type="submit"
            className="m-2 sm:col-span-2 lg:col-span-1 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold rounded-full px-8 py-3.5 transition"
          >
            Plan Your Trip
          </button>
        </motion.form>
      </div>
    </section>
  )
}
