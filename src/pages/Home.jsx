import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'

const features = [
  {
    title: 'Exquisite Locations',
    text: "Explore the world's most breathtaking destinations",
    cta: 'Learn More',
    to: '/destinations',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Bespoke Experiences',
    text: 'Personalized itineraries crafted just for you',
    cta: 'View Experiences',
    to: '/packages',
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Luxury Accommodations',
    text: 'Stay in the finest hotels and villas',
    cta: 'Discover More',
    to: '/packages',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-xs text-gold-dark">Why WanderWise</p>
          <h2 className="font-serif text-4xl text-navy mt-3">Journeys Made Unforgettable</h2>
          <div className="mx-auto mt-5 h-px w-20 bg-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group bg-white rounded-lg overflow-hidden border border-gold/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="overflow-hidden h-56">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-2xl text-navy">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.text}</p>
                <Link
                  to={f.to}
                  className="inline-flex items-center gap-1 mt-4 text-gold-dark font-semibold hover:gap-2 transition-all"
                >
                  {f.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative h-105 flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1920&q=80"
          alt="Tropical beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-4"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-gold">Your next escape awaits</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mt-3">
            Ready for your <span className="italic text-gold">dream holiday?</span>
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-8 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold px-8 py-3 rounded-md transition"
          >
            Plan Your Trip <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
