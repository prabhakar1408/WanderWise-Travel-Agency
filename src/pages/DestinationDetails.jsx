import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, CalendarDays, Plane, BedDouble, ArrowLeft, ArrowRight, Star, Wallet,
  Camera, Mountain, Waves, Landmark, TreePine, Sunset, Compass, Sparkles,
} from 'lucide-react'
import { destinations } from '../data/destinations'
import { details } from '../data/details'
import { packages } from '../data/packages'
import { placeImages } from '../data/placeImages'
import HeartButton from '../components/HeartButton'

const icons = [Camera, Mountain, Waves, Landmark, TreePine, Sunset, Compass]

const badge = {
  Luxury: 'bg-gold text-navy',
  'Mid-range': 'bg-sky-500 text-white',
  Budget: 'bg-emerald-500 text-white',
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 shrink-0 rounded-full bg-navy flex items-center justify-center">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-widest text-gold-dark">{label}</p>
        <p className="text-sm text-slate-700 leading-snug">{value}</p>
      </div>
    </div>
  )
}

export default function DestinationDetails() {
  const { id } = useParams()
  const d = destinations.find((x) => String(x.id) === id)
  const info = details[id]

  if (!d) {
    return (
      <section className="pt-40 pb-20 text-center px-4">
        <h1 className="font-serif text-4xl text-navy">Destination not found</h1>
        <Link to="/destinations" className="inline-block mt-6 text-gold-dark font-semibold">Back to destinations</Link>
      </section>
    )
  }

  const pkg = info && info.packageId ? packages.find((p) => p.id === info.packageId) : null
  const similar = destinations
    .filter((x) => x.id !== d.id)
    .sort((a, b) => (b.tag === d.tag) - (a.tag === d.tag))
    .slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-125 flex items-end overflow-hidden">
        <motion.img
          src={d.img}
          alt={d.name}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/95 via-navy/40 to-navy/60" />
        <HeartButton itemKey={'d-' + d.id} className="absolute top-28 right-6 z-10" />

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 pb-28 pt-40 text-white">
          <Link to="/destinations" className="inline-flex items-center gap-1 text-sm text-gold mb-5">
            <ArrowLeft className="w-4 h-4" /> All destinations
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur border border-white/30 text-xs px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-gold" /> {d.tag}
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl mt-4">{d.name}</h1>
            <div className="flex flex-wrap items-center gap-5 mt-4 text-white/90">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gold" /> {d.country}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" /> {d.rating} rating</span>
            </div>
          </motion.div>
        </div>
      </section>

      {!info ? (
        <section className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="font-serif text-3xl text-navy">Details coming soon</h2>
          <p className="text-slate-600 mt-3">We are adding places to visit and stays for {d.name}.</p>
          <Link to="/packages" className="inline-flex items-center gap-2 mt-6 bg-navy text-gold font-semibold px-7 py-3 rounded-md">
            View Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      ) : (
        <>
          {/* FACTS BAR */}
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 -mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white/85 backdrop-blur-xl border border-gold/30 rounded-2xl p-6 shadow-2xl"
            >
              <Fact icon={CalendarDays} label="Best time" value={info.bestTime} />
              <Fact icon={Plane} label="Nearest airport" value={info.airport} />
              <Fact icon={Wallet} label="Starting from" value={'$' + d.price + ' per person'} />
              <Fact icon={Star} label="Traveller rating" value={d.rating + ' out of 5'} />
            </motion.div>
          </section>

          {/* STICKY MENU */}
          <nav className="sticky top-20 z-30 mt-10 bg-white/85 backdrop-blur border-y border-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-8 overflow-x-auto text-sm font-medium">
              {[['overview', 'Overview'], ['places', 'Places'], ['stays', 'Stays'], ['more', 'More']].map(([h, l]) => (
                <a key={h} href={'#' + h} className="py-4 whitespace-nowrap text-slate-700 hover:text-gold-dark transition">
                  {l}
                </a>
              ))}
            </div>
          </nav>

          {/* OVERVIEW */}
          <section id="overview" className="scroll-mt-40 max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <p className="uppercase tracking-[0.3em] text-xs text-gold-dark">Overview</p>
              <h2 className="font-serif text-4xl text-navy mt-3">Discover {d.name}</h2>
              <div className="mt-4 h-px w-20 bg-gold" />
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">{info.intro}</p>
              <div className="flex flex-wrap gap-3 mt-6">
                {[d.tag, d.country, info.places.length + ' places to see', info.stays.length + ' stay options'].map((c) => (
                  <span key={c} className="bg-white border border-gold/30 text-slate-700 text-sm px-4 py-1.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden bg-navy text-white rounded-2xl p-7 shadow-xl h-fit">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/20 blur-3xl" />
              <div className="absolute -bottom-12 -left-10 w-40 h-40 rounded-full bg-sky-400/10 blur-3xl" />
              <p className="relative text-gold text-xs uppercase tracking-widest">Plan your trip</p>
              <p className="relative font-serif text-4xl mt-2">${d.price}<span className="text-base text-white/60"> / person</span></p>
              <Link to="/planner" className="relative flex items-center justify-center gap-2 mt-6 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold py-3 rounded-lg transition">
                <Sparkles className="w-4 h-4" /> Use AI Planner
              </Link>
              <Link to="/contact" className="relative block text-center mt-3 border border-gold/60 text-gold hover:bg-gold hover:text-navy font-semibold py-3 rounded-lg transition">
                Enquire Now
              </Link>
            </div>
          </section>

          {/* PLACES */}
          <section id="places" className="scroll-mt-40 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
            <div className="text-center mb-12">
              <p className="uppercase tracking-[0.3em] text-xs text-gold-dark">Must see</p>
              <h2 className="font-serif text-4xl text-navy mt-3">Best Places to Visit</h2>
              <div className="mx-auto mt-5 h-px w-20 bg-gold" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {info.places.map((p, i) => {
                const Icon = icons[i % icons.length]
                const photo = placeImages[p.name]
                return (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                    className="group bg-white border border-gold/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                  >
                    <div className="relative h-44 overflow-hidden">
                      {photo ? (
                        <img src={photo} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                      ) : (
                        <div className="relative w-full h-full bg-linear-to-br from-navy via-navy to-gold-dark/80 flex items-center justify-center">
                          <Icon className="w-16 h-16 text-gold/70 group-hover:scale-110 transition duration-500" />
                          <span className="absolute right-4 bottom-0 font-serif text-8xl leading-none text-white/10">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 w-9 h-9 rounded-full bg-gold text-navy font-bold flex items-center justify-center shadow-lg">
                        {i + 1}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-navy">{p.name}</h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.text}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* STAYS */}
          <section id="stays" className="scroll-mt-40 relative bg-navy pt-28 pb-20 overflow-hidden">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-14 rotate-180">
              <path fill="#f6f1e8" d="M0,40 C240,80 480,0 720,30 C960,60 1200,70 1440,20 L1440,80 L0,80 Z" />
            </svg>
            <div className="absolute top-20 -left-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute bottom-0 -right-24 w-96 h-96 rounded-full bg-sky-400/10 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="uppercase tracking-[0.3em] text-xs text-gold">Where to stay</p>
                <h2 className="font-serif text-4xl text-white mt-3">Hotels and Stays</h2>
                <div className="mx-auto mt-5 h-px w-20 bg-gold" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {info.stays.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:-translate-y-1 transition duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                      <BedDouble className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-white mt-4">{s.name}</h3>
                    <p className="text-sm text-white/70 mt-1">{s.type}</p>
                    <p className="flex items-center gap-1 text-sm text-white/70 mt-1">
                      <MapPin className="w-4 h-4 text-gold" /> {s.area}
                    </p>
                    <span className={'inline-block mt-4 text-xs font-semibold px-3 py-1 rounded-full ' + (badge[s.budget] || 'bg-gold text-navy')}>
                      {s.budget}
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-white/50 text-center mt-8">
                Stay suggestions only. Please check current availability and rates before booking.
              </p>
            </div>
          </section>

          {/* MORE */}
          <section id="more" className="scroll-mt-40 max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <div className="text-center mb-12">
              <p className="uppercase tracking-[0.3em] text-xs text-gold-dark">Keep exploring</p>
              <h2 className="font-serif text-4xl text-navy mt-3">You May Also Like</h2>
              <div className="mx-auto mt-5 h-px w-20 bg-gold" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similar.map((x) => (
                <Link
                  key={x.id}
                  to={'/destinations/' + x.id}
                  className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition"
                >
                  <img src={x.img} alt={x.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/10 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <h3 className="font-serif text-2xl">{x.name}</h3>
                    <p className="flex items-center justify-between text-sm text-white/80 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gold" /> {x.country}</span>
                      <span className="text-gold font-semibold">From ${x.price}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="relative h-80 flex items-center justify-center text-center overflow-hidden">
            <img src={d.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-navy/75" />
            <div className="relative px-4">
              <p className="uppercase tracking-[0.3em] text-xs text-gold">{pkg ? 'Ready to go?' : 'Interested in ' + d.name + '?'}</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mt-3">
                {pkg ? pkg.title : 'Let us plan it for you'}
              </h2>
              {pkg && (
                <p className="text-white/70 mt-2">{pkg.days} days, from <span className="text-gold font-semibold">${pkg.price}</span> per person</p>
              )}
              <Link
                to={pkg ? '/packages/' + pkg.id : '/contact'}
                className="inline-flex items-center gap-2 mt-6 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold px-8 py-3 rounded-md transition"
              >
                {pkg ? 'View Package' : 'Contact Us'} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  )
}
