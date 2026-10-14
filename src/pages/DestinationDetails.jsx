import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, CalendarDays, Plane, BedDouble, ArrowLeft, ArrowRight, Star, Clock, Check,
  ChevronDown, Sparkles, Compass, Camera, Mountain, Waves, Landmark, TreePine, Sunset,
} from 'lucide-react'
import { destinations } from '../data/destinations'
import { details } from '../data/details'
import { packages } from '../data/packages'
import { placeImages } from '../data/placeImages'
import { wikiTitles } from '../data/wikiTitles'
import { useWikiPhotos } from '../hooks/useWikiPhotos'
import HeartButton from '../components/HeartButton'

const icons = [Camera, Mountain, Waves, Landmark, TreePine, Sunset, Compass]
const grads = [
  'from-navy via-navy to-gold-dark/80',
  'from-sky-900 via-navy to-sky-600/70',
  'from-emerald-900 via-navy to-emerald-600/70',
  'from-indigo-900 via-navy to-indigo-500/70',
  'from-rose-900 via-navy to-rose-500/60',
  'from-amber-800 via-navy to-amber-500/60',
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function bestMonths(text) {
  const on = new Set()
  const names = MONTHS.join('|')
  const range = new RegExp('(' + names + ') to (' + names + ')', 'g')
  let m
  while ((m = range.exec(text))) {
    let i = MONTHS.indexOf(m[1])
    const j = MONTHS.indexOf(m[2])
    on.add(i)
    while (i !== j) {
      i = (i + 1) % 12
      on.add(i)
    }
  }
  const rest = text.replace(range, '')
  ;(rest.match(new RegExp(names, 'g')) || []).forEach((n) => on.add(MONTHS.indexOf(n)))
  return on
}

const badge = {
  Luxury: 'bg-gold text-navy',
  'Mid-range': 'bg-sky-500 text-white',
  Budget: 'bg-emerald-500 text-white',
}

const crops = ['object-left-top', 'object-left-bottom', 'object-right-top', 'object-right-bottom']

function Tile({ photo, fallback, className }) {
  const [bad, setBad] = useState(false)
  const src = bad ? fallback : photo.src
  const zoom = bad || photo.zoom
  return (
    <div className={'group relative overflow-hidden rounded-2xl ' + className}>
      <img
        src={src}
        alt=""
        onError={() => setBad(true)}
        className={'w-full h-full object-cover transition duration-700 group-hover:scale-110 ' + (zoom ? 'scale-150 ' + (photo.pos || 'object-right-top') : '')}
      />
    </div>
  )
}

function PlacePhoto({ src, name, index }) {
  const [bad, setBad] = useState(false)
  const Icon = icons[index % icons.length]
  if (src && !bad) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => setBad(true)}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
      />
    )
  }
  return (
    <div className={'relative w-full h-full bg-linear-to-br flex items-center justify-center ' + grads[index % grads.length]}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(201,162,75,0.5) 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }} />
      <Icon className="relative w-16 h-16 text-gold/80 group-hover:scale-110 transition duration-500" />
    </div>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 shrink-0 rounded-xl border border-gold/30 bg-white flex items-center justify-center">
        <Icon className="w-5 h-5 text-gold-dark" />
      </div>
      <div>
        <p className="text-[11px] text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-navy leading-snug">{value}</p>
      </div>
    </div>
  )
}

function Row({ n, title, open, onToggle, children }) {
  return (
    <div className="border-b border-gold/25">
      <button onClick={onToggle} className="w-full flex items-center gap-4 py-4 text-left">
        <span className="w-8 h-8 shrink-0 rounded-full border border-gold/50 text-gold-dark text-sm font-semibold flex items-center justify-center">{n}</span>
        <span className="flex-1 font-semibold text-navy">{title}</span>
        <ChevronDown className={'w-5 h-5 text-gold-dark transition ' + (open ? 'rotate-180' : '')} />
      </button>
      {open && <div className="pl-12 pb-5">{children}</div>}
    </div>
  )
}

export default function DestinationDetails() {
  const { id } = useParams()
  const [openDay, setOpenDay] = useState(0)

  const d = destinations.find((x) => String(x.id) === id)
  const info = (d && details[id]) || { intro: 'Details coming soon.', bestTime: '-', airport: '-', places: [], stays: [], packageId: null }

  const titles = info.places.map((p) => wikiTitles[p.name]).filter(Boolean)
  const wiki = useWikiPhotos(titles)

  if (!d) {
    return (
      <section className="pt-40 pb-20 text-center px-4">
        <h1 className="font-serif text-4xl text-navy">Destination not found</h1>
        <Link to="/destinations" className="inline-block mt-6 text-gold-dark font-semibold">Back to destinations</Link>
      </section>
    )
  }

  const pkg = info.packageId ? packages.find((p) => p.id === info.packageId) : null
  const months = bestMonths(info.bestTime)
  const similar = destinations
    .filter((x) => x.id !== d.id)
    .sort((a, b) => (b.tag === d.tag) - (a.tag === d.tag))
    .slice(0, 3)

  const photoFor = (p) => placeImages[p.name] || wiki[wikiTitles[p.name]]
  const found = info.places.map(photoFor).filter(Boolean)

  const gallery = [{ src: d.img, zoom: false }]
  for (let i = 0; i < 4; i++) {
    gallery.push(found[i] ? { src: found[i], zoom: false } : { src: d.img, zoom: true, pos: crops[i] })
  }

  const bookTo = pkg ? '/packages/' + pkg.id : '/contact'

  return (
    <>
      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
        <Link to="/destinations" className="inline-flex items-center gap-1 text-sm text-gold-dark font-medium mb-4">
          <ArrowLeft className="w-4 h-4" /> All destinations
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 h-72 sm:h-96 lg:h-120"
        >
          <Tile photo={gallery[0]} fallback={d.img} className="col-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-2" />
          <Tile photo={gallery[1]} fallback={d.img} className="hidden lg:block lg:col-start-1 lg:row-start-1" />
          <Tile photo={gallery[2]} fallback={d.img} className="hidden lg:block lg:col-start-1 lg:row-start-2" />
          <Tile photo={gallery[3]} fallback={d.img} className="hidden lg:block lg:col-start-4 lg:row-start-1" />
          <Tile photo={gallery[4]} fallback={d.img} className="hidden lg:block lg:col-start-4 lg:row-start-2" />
          <HeartButton itemKey={'d-' + d.id} className="absolute top-4 right-4 z-10" />
          <span className="absolute bottom-4 left-4 z-10 flex items-center gap-1 bg-white/90 backdrop-blur text-navy text-xs font-semibold px-3 py-1.5 rounded-full">
            <Camera className="w-3.5 h-3.5 text-gold-dark" /> {d.name}, {d.country}
          </span>
        </motion.div>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="bg-white border border-gold/30 text-slate-700 px-3 py-1 rounded-md">{d.tag}</span>
            <span className="text-slate-500">{d.country}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-navy mt-4">{d.name}{pkg ? ': ' + pkg.title : ''}</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">{info.intro}</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-7 mt-7 border-y border-gold/25">
            <Stat icon={Clock} label="Duration" value={pkg ? pkg.days + ' days' : 'Flexible'} />
            <Stat icon={CalendarDays} label="Best time" value={info.bestTime.split('(')[0]} />
            <Stat icon={Plane} label="Nearest airport" value={info.airport.split(' (')[0].split(',')[0]} />
            <Stat icon={Star} label="Rating" value={d.rating + ' out of 5'} />
          </div>

          <h2 className="font-serif text-3xl text-navy mt-10">Best Months to Visit</h2>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 mt-5">
            {MONTHS.map((m, i) => (
              <div
                key={m}
                className={'text-center text-xs font-semibold py-2.5 rounded-lg border ' + (months.has(i) ? 'bg-gold text-navy border-gold shadow' : 'bg-white text-slate-400 border-gold/15')}
              >
                {m.slice(0, 3)}
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-3">{info.bestTime}</p>

          {pkg && (
            <>
              <h2 className="font-serif text-3xl text-navy mt-12">What's Included</h2>
              <ul className="mt-5 grid sm:grid-cols-2 gap-3 bg-white border border-gold/25 rounded-2xl p-6">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 text-sm">
                    <span className="w-6 h-6 rounded-md bg-navy flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-gold" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* BEST PLACES */}
          <h2 className="font-serif text-3xl text-navy mt-12">Best Places to Visit</h2>
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            {info.places.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.5 }}
                className="group bg-white border border-gold/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <PlacePhoto src={photoFor(p)} name={p.name} index={i} />
                  <span className="absolute top-3 left-3 w-9 h-9 rounded-full bg-gold text-navy font-bold flex items-center justify-center shadow-lg">
                    {i + 1}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-navy">{p.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">Photos from Wikipedia and Wikimedia Commons, used under their open licences.</p>

          {pkg && (
            <>
              <h2 className="font-serif text-3xl text-navy mt-12">Itinerary</h2>
              <div className="mt-4 border-t border-gold/25">
                {pkg.itinerary.map((step, i) => (
                  <Row key={i} n={i + 1} title={'Day ' + (i + 1)} open={openDay === i} onToggle={() => setOpenDay(openDay === i ? -1 : i)}>
                    <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                  </Row>
                ))}
              </div>
            </>
          )}

          <h2 className="font-serif text-3xl text-navy mt-12">Where to Stay</h2>
          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            {info.stays.map((s) => (
              <div key={s.name} className="bg-white border border-gold/25 rounded-2xl p-5 hover:shadow-lg transition">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <BedDouble className="w-5 h-5 text-gold" />
                  </div>
                  <span className={'text-xs font-semibold px-3 py-1 rounded-full ' + (badge[s.budget] || 'bg-gold text-navy')}>{s.budget}</span>
                </div>
                <h3 className="font-serif text-xl text-navy mt-3">{s.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{s.type}</p>
                <p className="flex items-center gap-1 text-sm text-slate-600 mt-1"><MapPin className="w-4 h-4 text-gold-dark" /> {s.area}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">Stay suggestions only. Please check current availability and rates before booking.</p>
        </div>

        {/* PRICE CARD */}
        <aside className="lg:sticky lg:top-28 h-fit bg-white border border-gold/30 rounded-2xl p-6 shadow-xl">
          <span className="inline-flex items-center gap-1 bg-navy text-gold text-xs font-semibold px-3 py-1 rounded-md">
            <Sparkles className="w-3 h-3" /> Featured
          </span>
          <p className="font-serif text-3xl text-navy mt-4">{pkg ? pkg.days + ' days' : d.name}</p>
          <p className="text-slate-500">{pkg ? pkg.destination : d.country}</p>
          <p className="font-serif text-5xl text-navy mt-4">
            ${d.price} <span className="text-sm text-slate-500 font-sans">USD / person</span>
          </p>
          <div className="flex items-center gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className={'w-4 h-4 ' + (n <= Math.round(d.rating) ? 'text-gold fill-gold' : 'text-slate-300')} />
            ))}
            <span className="text-sm text-slate-600 ml-2">{d.rating} / 5</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-5 border border-gold/25 rounded-xl p-3 text-center">
            <div><BedDouble className="w-5 h-5 mx-auto text-gold-dark" /><p className="text-sm font-semibold text-navy mt-1">{info.stays.length}</p><p className="text-[11px] text-slate-500">Stays</p></div>
            <div><Compass className="w-5 h-5 mx-auto text-gold-dark" /><p className="text-sm font-semibold text-navy mt-1">{info.places.length}</p><p className="text-[11px] text-slate-500">Places</p></div>
            <div><CalendarDays className="w-5 h-5 mx-auto text-gold-dark" /><p className="text-sm font-semibold text-navy mt-1">{months.size}</p><p className="text-[11px] text-slate-500">Best months</p></div>
          </div>

          <Link to={bookTo} className="block text-center mt-5 bg-navy hover:bg-gold text-gold hover:text-navy font-semibold py-3 rounded-full transition">
            {pkg ? 'Book Now' : 'Enquire Now'}
          </Link>
          <Link to="/planner" className="flex items-center justify-center gap-2 mt-3 border border-navy text-navy hover:bg-navy hover:text-gold font-semibold py-3 rounded-full transition">
            <Sparkles className="w-4 h-4" /> Use AI Planner
          </Link>
        </aside>
      </section>

      {/* RECOMMENDED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="font-serif text-3xl text-navy">Recommended for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {similar.map((x) => (
            <Link
              key={x.id}
              to={'/destinations/' + x.id}
              className="group bg-white border border-gold/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              <div className="h-44 overflow-hidden">
                <img src={x.img} alt={x.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl text-navy">{x.name}</h3>
                <p className="flex items-center gap-1 text-sm text-slate-600 mt-1"><MapPin className="w-4 h-4 text-gold-dark" /> {x.country}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/20">
                  <p className="text-sm text-slate-500">From <span className="text-navy font-semibold text-lg">${x.price}</span></p>
                  <span className="flex items-center gap-1 text-sm text-gold-dark font-semibold">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
