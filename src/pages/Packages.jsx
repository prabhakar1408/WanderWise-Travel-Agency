import { useState } from 'react'
import { packages } from '../data/packages'
import PackageCard from '../components/PackageCard'

const tags = ['All', 'Beach', 'City', 'Culture', 'Mountain', 'Adventure']

export default function Packages() {
  const [tag, setTag] = useState('All')
  const list = packages.filter((p) => tag === 'All' || p.tag === tag)

  return (
    <>
      <section className="bg-navy pt-36 pb-20 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs text-gold">Handpicked for you</p>
        <h1 className="font-serif text-5xl text-white mt-3">
          Tour <span className="italic text-gold">Packages</span>
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
                tag === t ? 'bg-navy text-gold border-navy' : 'bg-white text-slate-700 border-gold/30 hover:border-gold'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((p, i) => (
            <PackageCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
