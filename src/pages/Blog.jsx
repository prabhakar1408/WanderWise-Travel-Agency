import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronDown } from 'lucide-react'
import { posts } from '../data/posts'

export default function Blog() {
  const [openId, setOpenId] = useState(null)

  return (
    <>
      <section className="bg-navy pt-36 pb-20 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs text-gold">Stories and tips</p>
        <h1 className="font-serif text-5xl text-white mt-3">
          Travel <span className="italic text-gold">Blog</span>
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((p, i) => {
          const open = openId === p.id
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.5 }}
              className="group bg-white rounded-xl overflow-hidden border border-gold/20 shadow-sm hover:shadow-xl transition"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <span className="absolute top-4 left-4 bg-navy/80 backdrop-blur text-gold text-xs px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold-dark" /> {p.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-dark" /> {p.read}</span>
                </div>
                <h2 className="font-serif text-2xl text-navy mt-3">{p.title}</h2>
                <p className="mt-2 text-slate-600">{p.excerpt}</p>

                {open && <p className="mt-4 text-slate-700 leading-relaxed border-t border-gold/20 pt-4">{p.body}</p>}

                <button
                  onClick={() => setOpenId(open ? null : p.id)}
                  className="inline-flex items-center gap-1 mt-4 text-gold-dark font-semibold"
                >
                  {open ? 'Show less' : 'Read more'}
                  <ChevronDown className={`w-4 h-4 transition ${open ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </motion.article>
          )
        })}
      </section>
    </>
  )
}
