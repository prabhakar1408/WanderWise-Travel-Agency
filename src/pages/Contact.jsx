import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown } from 'lucide-react'
import { destinations } from '../data/destinations'

const faqs = [
  { q: 'How do I book a trip?', a: 'Choose a package, then send us a message from this page. We will confirm availability and the final price.' },
  { q: 'Can I customize a package?', a: 'Yes. Tell us your dates, guests and hotel type, and we will adjust the itinerary for you.' },
  { q: 'Are the prices final?', a: 'Prices shown on the site are starting prices. The exact quote depends on dates and your choices.' },
  { q: 'How soon will you reply?', a: 'We usually reply within one working day.' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', message: '' })

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', destination: '', message: '' })
  }

  const input = 'w-full border border-gold/40 bg-white rounded-lg px-4 py-3 outline-none focus:border-gold-dark'

  return (
    <>
      <section className="bg-navy pt-36 pb-20 text-center px-4">
        <p className="uppercase tracking-[0.3em] text-xs text-gold">We would love to hear from you</p>
        <h1 className="font-serif text-5xl text-white mt-3">
          Contact <span className="italic text-gold">Us</span>
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-gold" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-5">
          {[
            { icon: Mail, title: 'Email', text: 'hello@wanderwise.com' },
            { icon: Phone, title: 'Phone', text: '+91 00000 00000' },
            { icon: MapPin, title: 'Office', text: 'Meerut, Uttar Pradesh, India' },
            { icon: Clock, title: 'Working Hours', text: 'Mon - Sat, 10:00 AM to 7:00 PM' },
          ].map((c) => (
            <div key={c.title} className="flex items-center gap-4 bg-white border border-gold/20 rounded-xl p-5">
              <div className="w-12 h-12 shrink-0 rounded-full bg-navy flex items-center justify-center">
                <c.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-serif text-lg text-navy">{c.title}</p>
                <p className="text-slate-600 text-sm">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white border border-gold/20 rounded-xl p-6 sm:p-8 shadow-sm">
          {sent ? (
            <div className="text-center py-16">
              <CheckCircle2 className="w-14 h-14 text-gold-dark mx-auto" />
              <h2 className="font-serif text-3xl text-navy mt-4">Thank you!</h2>
              <p className="text-slate-600 mt-2">Your message has been received. We will get back to you soon.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-gold-dark font-semibold">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input name="name" required value={form.name} onChange={change} placeholder="Your name" className={input} />
              <input name="email" type="email" required value={form.email} onChange={change} placeholder="Email address" className={input} />
              <input name="phone" value={form.phone} onChange={change} placeholder="Phone number" className={input} />
              <select name="destination" value={form.destination} onChange={change} className={input}>
                <option value="">Preferred destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
              <textarea
                name="message"
                required
                rows="5"
                value={form.message}
                onChange={change}
                placeholder="Tell us about your dream trip..."
                className={input + ' sm:col-span-2'}
              />
              <button className="sm:col-span-2 flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy hover:text-white font-semibold py-3 rounded-lg transition">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-gold-dark">Questions</p>
          <h2 className="font-serif text-4xl text-navy mt-3">Frequently Asked</h2>
          <div className="mx-auto mt-5 h-px w-20 bg-gold" />
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i
            return (
              <div key={f.q} className="bg-white border border-gold/20 rounded-lg">
                <button
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-medium text-navy"
                >
                  {f.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 text-gold-dark transition ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">{f.a}</p>}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
