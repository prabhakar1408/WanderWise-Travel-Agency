import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-xs text-gold-dark">Testimonials</p>
          <h2 className="font-serif text-4xl text-navy mt-3">What Our Travelers Say</h2>
          <div className="mx-auto mt-5 h-px w-20 bg-gold" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-cream border border-gold/20 rounded-xl p-6 shadow-sm"
            >
              <Quote className="w-8 h-8 text-gold" />
              <p className="mt-4 text-slate-700">{t.text}</p>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: t.rating }).map((_, n) => (
                  <Star key={n} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="mt-3 font-serif text-lg text-navy">{t.name}</p>
              <p className="text-sm text-slate-500">{t.trip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
