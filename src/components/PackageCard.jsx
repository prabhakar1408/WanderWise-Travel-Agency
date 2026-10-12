import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeartButton from './HeartButton'

export default function PackageCard({ p, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      className="group bg-white rounded-xl overflow-hidden border border-gold/20 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        <span className="absolute top-4 left-4 bg-navy/80 backdrop-blur text-gold text-xs px-3 py-1 rounded-full">{p.tag}</span>
        <HeartButton itemKey={'p-' + p.id} className="absolute top-4 right-4 z-10" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl text-navy">{p.title}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gold-dark" /> {p.destination}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gold-dark" /> {p.days} Days</span>
        </div>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-gold/20">
          <p className="text-sm text-slate-500">
            From <span className="text-navy font-semibold text-xl">${p.price}</span>
          </p>
          <Link to={'/packages/' + p.id} className="bg-navy hover:bg-gold text-gold hover:text-navy text-sm font-semibold px-5 py-2 rounded-md transition">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
