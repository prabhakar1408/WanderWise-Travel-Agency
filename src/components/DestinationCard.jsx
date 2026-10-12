import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeartButton from './HeartButton'

export default function DestinationCard({ d, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
      className="group relative h-96 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition"
    >
      <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
      <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/20 to-transparent" />

      <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs px-3 py-1 rounded-full">
        {d.tag}
      </span>
      <span className="absolute top-4 right-4 flex items-center gap-1 bg-gold text-navy text-xs font-semibold px-2.5 py-1 rounded-full">
        <Star className="w-3 h-3 fill-navy" /> {d.rating}
      </span>
      <HeartButton itemKey={'d-' + d.id} className="absolute top-14 right-4 z-10" />

      <div className="absolute bottom-0 inset-x-0 p-5 text-white">
        <h3 className="font-serif text-2xl">{d.name}</h3>
        <p className="flex items-center gap-1 text-white/80 text-sm mt-1">
          <MapPin className="w-4 h-4 text-gold" /> {d.country}
        </p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-white/70">
            From <span className="text-gold font-semibold text-lg">${d.price}</span>
          </p>
          <Link to="/packages" className="text-sm border border-gold text-gold hover:bg-gold hover:text-navy px-4 py-1.5 rounded-md transition">
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
