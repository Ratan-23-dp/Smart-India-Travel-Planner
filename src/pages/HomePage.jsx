import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DestinationCard from '../components/DestinationCard'
import { getDestinations } from '../services/supabase'
import { DESTINATIONS as LOCAL_DESTINATIONS } from '../utils/data'

const FLOAT_ICONS = ['✈️', '🗺️', '🏔️', '🌊', '🏰', '🎒', '📸', '🌺', '⛵', '🎭', '🦁', '🌅']
const QUICK_DESTS = ['Goa', 'Jaipur', 'Manali', 'Delhi', 'Mumbai', 'Varanasi', 'Patna']
const FEATURES = [
  { icon: '🧠', title: 'AI Itinerary Generator', desc: 'Smart day-by-day trip plans tailored to your budget, style, and duration.' },
  { icon: '💸', title: 'Expense Splitter', desc: 'Add members, track group expenses and settle bills effortlessly.' },
  { icon: '🌤️', title: 'Live Weather', desc: 'Real-time weather and 5-day forecasts for any destination in India.' },
  { icon: '🍽️', title: 'Food Explorer', desc: 'Discover local cuisines, street food, recipes and regional specialities.' },
  { icon: '🗺️', title: 'Interactive Maps', desc: 'Visualise your trip with Leaflet maps, markers and nearby attractions.' },
  { icon: '📄', title: 'PDF Download', desc: 'Download your complete itinerary as a beautifully formatted PDF.' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [counter, setCounter] = useState({ trips: 0, destinations: 0, users: 0 })

  // Animated counters
  useEffect(() => {
    const targets = { trips: 120, destinations: 50, users: 350 }
    const steps = 60
    const dur = 2000
    let cur = { trips: 0, destinations: 0, users: 0 }
    const id = setInterval(() => {
      cur = {
        trips: Math.min(cur.trips + targets.trips / steps, targets.trips),
        destinations: Math.min(cur.destinations + targets.destinations / steps, targets.destinations),
        users: Math.min(cur.users + targets.users / steps, targets.users),
      }
      setCounter({ trips: Math.floor(cur.trips), destinations: Math.floor(cur.destinations), users: Math.floor(cur.users) })
      if (cur.trips >= targets.trips) clearInterval(id)
    }, dur / steps)
    return () => clearInterval(id)
  }, [])

  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    getDestinations().then((d) => {
      const data = d.length > 0 ? d : LOCAL_DESTINATIONS
      const merged = data.map(item => {
        const local = LOCAL_DESTINATIONS.find(l => l.name.toLowerCase() === item.name.toLowerCase())
        return { ...item, image: item.image || local?.image }
      })
      setDestinations(merged)
    })
  }, [])

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        minHeight: 'calc(100vh - 64px)', paddingTop: 64,
        background: 'linear-gradient(135deg,#0a0f1e 0%,#0f1929 40%,#1a1030 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '3rem 2rem',
      }}>
        {/* Radial glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%,rgba(249,115,22,0.12) 0%,transparent 60%),radial-gradient(ellipse at 70% 30%,rgba(20,184,166,0.08) 0%,transparent 60%)' }} />

        {/* Floating icons */}
        {FLOAT_ICONS.map((ic, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: `${(i * 8.3) % 100}%`, top: `${(i * 13 + 10) % 80}%`, fontSize: '1.5rem', opacity: 0.15, pointerEvents: 'none' }}
          >{ic}</motion.div>
        ))}

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', maxWidth: 800 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 100, padding: '0.4rem 1.1rem', fontSize: '0.8rem', fontWeight: 500, color: '#f97316', marginBottom: '1.5rem' }}>
            ✨ India's Smartest Travel Planner
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1.1, marginBottom: '1rem', fontFamily: "'Playfair Display',serif" }}>
            Explore <span style={{ background: 'linear-gradient(135deg,#f97316,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Incredible India</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: 600, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Plan smarter trips with real-time attractions, live weather, food recommendations, interactive maps, and intelligent budget tracking.
          </p>

          {/* Search bar */}
          <div style={{ display: 'flex', gap: '0.75rem', maxWidth: 560, margin: '0 auto 2rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '0.5rem', backdropFilter: 'blur(10px)' }}>
            <span style={{ fontSize: '1.1rem', padding: '0 0.25rem' }}>🔍</span>
            <input
              placeholder="Search destinations — Goa, Manali, Jaipur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/explore')}
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#f1f5f9', fontFamily: 'DM Sans,sans-serif' }}
            />
            <button className="btn-primary" style={{ padding: '0.4rem 1rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '0.85rem' }} onClick={() => navigate('/explore')}>
              Explore
            </button>
          </div>

          {/* Quick destinations */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {QUICK_DESTS.map((d) => (
              <button key={d} onClick={() => navigate(`/destination/${d}`)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '0.35rem 1rem', fontSize: '0.8rem', color: '#94a3b8', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'DM Sans,sans-serif' }}>
                {d}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[
              { num: `${counter.trips.toLocaleString()}+`, lbl: 'Trips Planned' },
              { num: `${counter.destinations}+`, lbl: 'Destinations' },
              { num: `${counter.users.toLocaleString()}+`, lbl: 'Happy Travellers' },
            ].map((s) => (
              <div key={s.lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: "'Playfair Display',serif", color: '#f97316' }}>{s.num}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Popular Destinations ── */}
      <section style={{ background: 'var(--bg2)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#f97316', marginBottom: '0.75rem' }}>🗺️ Discover</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Popular Destinations</h2>
            <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>From ancient temples to tropical beaches, explore India's most beloved places</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem' }}>
            {destinations.slice(0, 6).map((dest) => (
              <DestinationCard key={dest.id} dest={dest} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn-outline" style={{ padding: '0.75rem 2rem', borderRadius: 12, cursor: 'pointer', fontSize: '1rem', fontFamily: 'DM Sans,sans-serif' }} onClick={() => navigate('/explore')}>
              View All Destinations →
            </button>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#f97316', marginBottom: '0.75rem' }}>⚡ Features</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)' }}>Everything You Need</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <motion.div key={i} className="glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.15),rgba(251,191,36,0.08))', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Ready to Plan Your Dream Trip?</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Join thousands of travellers who use Smart India Travel Planner</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: 12, cursor: 'pointer', fontSize: '1rem', fontFamily: 'DM Sans,sans-serif' }} onClick={() => navigate('/plan')}>Plan My Trip 🚀</button>
          <button className="btn-outline" style={{ padding: '0.75rem 2rem', borderRadius: 12, cursor: 'pointer', fontSize: '1rem', fontFamily: 'DM Sans,sans-serif' }} onClick={() => navigate('/explore')}>Explore Destinations</button>
        </div>
      </section>
    </div>
  )
}
