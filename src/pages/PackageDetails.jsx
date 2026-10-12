import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, MapPin, Check, ArrowLeft } from 'lucide-react'
import { packages } from '../data/packages'

export default function PackageDetails() {
  const { id } = useParams()
  const p = packages.find((x) => String(x.id) === id)
  const [guests, setGuests] = useState(2)

  if (!p) {
    return (
      <section className="pt-40 pb-20 text-center px-4">
        <h1 className="font-serif text-4xl text-navy">Package not found</h1>
        <Link to="/packages" className="inline-block mt-6 text-gold-dark font-semibold">Back to packages</Link>
      </section>
    )
  }

  return (
    <>
      <section className="relative h-100 flex items-end">
        <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/40 to-navy/50" />
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 pb-10 text-white">
          <Link to="/packages" className="inline-flex items-center gap-1 text-sm text-gold mb-4">
            <ArrowLeft className="w-4 h-4" /> All packages
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl">{p.title}</h1>
          <div className="flex items-center gap-5 mt-3 text-white/85">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gold" /> {p.destination}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gold" /> {p.days} Days</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-3xl text-navy">About this trip</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{p.about}</p>

          <h2 className="font-serif text-3xl text-navy mt-10">Itinerary</h2>
          <ol className="mt-5 space-y-4">
            {p.itinerary.map((step, i) => (
              <li key={i} className="flex gap-4 bg-white border border-gold/20 rounded-lg p-4">
                <span className="shrink-0 w-10 h-10 rounded-full bg-navy text-gold font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold-dark">Day {i + 1}</p>
                  <p className="text-slate-700">{step}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="font-serif text-3xl text-navy mt-10">What is included</h2>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {p.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-slate-700">
                <Check className="w-5 h-5 text-gold-dark" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-28 h-fit bg-white border border-gold/30 rounded-xl p-6 shadow-lg">
          <p className="text-sm text-slate-500">Price per person</p>
          <p className="font-serif text-4xl text-navy">${p.price}</p>

          <label className="block mt-6 text-sm font-medium text-slate-700">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full border border-gold/40 rounded-lg px-3 py-2 outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gold/20">
            <span className="text-slate-600">Total</span>
            <span className="font-serif text-2xl text-navy">${(p.price * guests).toLocaleString()}</span>
          </div>

          <Link
            to="/contact"
            className="block text-center mt-6 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold py-3 rounded-lg transition"
          >
            Book This Trip
          </Link>
        </aside>
      </section>
    </>
  )
}
