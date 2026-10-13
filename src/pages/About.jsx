import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, ShieldCheck, Heart, Sparkles, ArrowRight, Search, CalendarCheck, Plane } from 'lucide-react'

const values = [
  { icon: Compass, title: 'Expert Planning', text: 'Every itinerary is planned carefully so you spend your time enjoying, not organizing.' },
  { icon: ShieldCheck, title: 'Trusted and Safe', text: 'Verified hotels, reliable transfers and clear pricing with no hidden surprises.' },
  { icon: Heart, title: 'Made For You', text: 'Tailor-made trips built around your pace, budget and the way you like to explore.' },
  { icon: Sparkles, title: 'Memorable Moments', text: 'From sunset cruises to local food walks, we add experiences you will remember.' },
]

const steps = [
  { icon: Search, title: 'Choose', text: 'Browse destinations and packages, or use our trip planner.' },
  { icon: CalendarCheck, title: 'Customize', text: 'Pick dates, guests and hotel type. We adjust the plan for you.' },
  { icon: Plane, title: 'Travel', text: 'Pack your bags. Transfers, stays and activities are taken care of.' },
]

export default function About() {
  return (
    <>
      <section className="bg-navy pt-36 pb-20 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs text-gold">Our story</p>
        <h1 className="font-serif text-5xl text-white mt-3">
          About <span className="italic text-gold">WanderWise</span>
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80"
            alt="Travelers exploring"
            className="rounded-xl shadow-xl w-full h-100 object-cover"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="font-serif text-4xl text-navy">Travel that feels personal</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            WanderWise is a travel agency built for people who want more than a standard tour. We design
            journeys around your interests, from snowy Himalayan escapes and island beaches to cultural
            city breaks, so every trip feels like it was made just for you.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Our goal is simple: make planning easy, keep pricing clear, and let you focus on enjoying the destination.
          </p>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 mt-8 bg-navy hover:bg-gold text-gold hover:text-navy font-semibold px-7 py-3 rounded-md transition"
          >
            Explore Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-xs text-gold-dark">Why choose us</p>
            <h2 className="font-serif text-4xl text-navy mt-3">What Sets Us Apart</h2>
            <div className="mx-auto mt-5 h-px w-20 bg-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-cream border border-gold/20 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-navy flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-navy mt-4">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-xs text-gold-dark">Simple process</p>
          <h2 className="font-serif text-4xl text-navy mt-3">How It Works</h2>
          <div className="mx-auto mt-5 h-px w-20 bg-gold" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="relative bg-white border border-gold/20 rounded-xl p-8 text-center">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold text-navy font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <s.icon className="w-8 h-8 text-gold-dark mx-auto" />
              <h3 className="font-serif text-2xl text-navy mt-3">{s.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy py-14 text-center px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-white">
          Ready to plan your <span className="italic text-gold">next trip?</span>
        </h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 mt-6 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold px-8 py-3 rounded-md transition"
        >
          Contact Us <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  )
}
