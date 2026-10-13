import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { destinations } from '../data/destinations'
import DestinationCard from '../components/DestinationCard'

const tags = ['All', 'Beach', 'City', 'Culture', 'Adventure', 'Mountain']

export default function Destinations() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [tag, setTag] = useState('All')

  const filtered = destinations.filter((d) => {
    const text = (d.name + ' ' + d.country).toLowerCase()
    return text.includes(query.toLowerCase()) && (tag === 'All' || d.tag === tag)
  })

  return (
    <>
      <section className="bg-navy pt-36 pb-20 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs text-gold">Explore the world</p>
        <h1 className="font-serif text-5xl text-white mt-3">
          Popular <span className="italic text-gold">Destinations</span>
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />

        <div className="mx-auto mt-8 max-w-xl flex items-center gap-2 bg-white rounded-lg px-4 py-3">
          <Search className="w-5 h-5 text-gold-dark" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destination or country..."
            className="w-full outline-none text-slate-800 placeholder:text-slate-500 bg-transparent"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
                tag === t
                  ? 'bg-navy text-gold border-navy'
                  : 'bg-white text-slate-700 border-gold/30 hover:border-gold'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mb-8">{filtered.length} destinations found</p>

        {filtered.length === 0 ? (
          <p className="text-center text-slate-500 py-20">No destination found. Try a different search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((d, i) => (
              <DestinationCard key={d.id} d={d} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
