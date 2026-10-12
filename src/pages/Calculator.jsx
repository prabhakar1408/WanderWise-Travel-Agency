import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator as CalcIcon } from 'lucide-react'
import { packages } from '../data/packages'

const hotels = [
  { label: 'Standard', mult: 1 },
  { label: 'Deluxe', mult: 1.25 },
  { label: 'Luxury', mult: 1.6 },
]

const addons = [
  { id: 'insurance', label: 'Travel insurance', price: 35 },
  { id: 'sightseeing', label: 'Extra sightseeing tour', price: 120 },
  { id: 'visa', label: 'Visa assistance', price: 60 },
  { id: 'pickup', label: 'Private airport pickup', price: 45 },
]

const EXTRA_NIGHT = 90

export default function Calculator() {
  const [pkgId, setPkgId] = useState(packages[0].id)
  const [guests, setGuests] = useState(2)
  const [hotel, setHotel] = useState(0)
  const [nights, setNights] = useState(0)
  const [picked, setPicked] = useState([])

  const pkg = packages.find((p) => p.id === pkgId)
  const base = Math.round(pkg.price * guests * hotels[hotel].mult)
  const addonTotal = addons.filter((a) => picked.includes(a.id)).reduce((s, a) => s + a.price * guests, 0)
  const rooms = Math.ceil(guests / 2)
  const nightsTotal = nights * EXTRA_NIGHT * rooms
  const total = base + addonTotal + nightsTotal

  const toggleAddon = (id) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const field = 'mt-1 w-full border border-gold/40 bg-white rounded-lg px-3 py-2.5 outline-none focus:border-gold-dark'

  return (
    <>
      <section className="bg-navy pt-36 pb-20 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs text-gold">Plan your budget</p>
        <h1 className="font-serif text-5xl text-white mt-3">
          Travel Cost <span className="italic text-gold">Calculator</span>
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 bg-white border border-gold/20 rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Package</label>
            <select value={pkgId} onChange={(e) => setPkgId(Number(e.target.value))} className={field}>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>{p.title} ({p.days} days, ${p.price}/person)</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-slate-700">Guests</label>
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={field}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Extra nights</label>
              <select value={nights} onChange={(e) => setNights(Number(e.target.value))} className={field}>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'night' : 'nights'}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Hotel type</p>
            <div className="flex flex-wrap gap-3">
              {hotels.map((h, i) => (
                <button
                  key={h.label}
                  type="button"
                  onClick={() => setHotel(i)}
                  className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
                    hotel === i ? 'bg-navy text-gold border-navy' : 'bg-white text-slate-700 border-gold/30 hover:border-gold'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Add-ons (per person)</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {addons.map((a) => (
                <label key={a.id} className="flex items-center justify-between gap-3 border border-gold/30 rounded-lg px-4 py-3 cursor-pointer hover:border-gold">
                  <span className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={picked.includes(a.id)} onChange={() => toggleAddon(a.id)} className="accent-yellow-600" />
                    {a.label}
                  </span>
                  <span className="text-sm text-gold-dark font-semibold">${a.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-2 h-fit lg:sticky lg:top-28 bg-navy text-white rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2">
            <CalcIcon className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-2xl">Cost Summary</h2>
          </div>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex justify-between gap-4">
              <span className="text-white/70">{pkg.title} x {guests} ({hotels[hotel].label})</span>
              <span>${base.toLocaleString()}</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-white/70">Add-ons</span>
              <span>${addonTotal.toLocaleString()}</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-white/70">Extra nights ({rooms} {rooms === 1 ? 'room' : 'rooms'})</span>
              <span>${nightsTotal.toLocaleString()}</span>
            </li>
          </ul>

          <div className="flex justify-between items-end mt-6 pt-5 border-t border-white/20">
            <span className="text-white/70">Estimated total</span>
            <span className="font-serif text-4xl text-gold">${total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-white/50 mt-2">
            About ${Math.round(total / guests).toLocaleString()} per person. Prices are estimates.
          </p>

          <Link to="/contact" className="block text-center mt-6 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold py-3 rounded-lg transition">
            Get an Exact Quote
          </Link>
        </aside>
      </section>
    </>
  )
}
