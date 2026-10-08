import { Plane } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 py-10 border-t-2 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-serif text-xl">
          <Plane className="w-5 h-5 text-gold" /> WanderWise
        </div>
        <p className="text-sm">© {new Date().getFullYear()} WanderWise Travel Agency. All rights reserved.</p>
      </div>
    </footer>
  )
}
