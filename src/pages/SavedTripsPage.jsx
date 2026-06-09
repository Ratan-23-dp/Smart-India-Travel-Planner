import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const SAMPLE_TRIPS = [
  { id: 1, dest: 'Goa',    days: 3, type: 'Friends',   date: '15 Dec 2024', travelers: 4, cost: 24000, emoji: '🏖️' },
  { id: 2, dest: 'Jaipur', days: 2, type: 'Couple',    date: '22 Jan 2025', travelers: 2, cost: 9500,  emoji: '🏰' },
  { id: 3, dest: 'Manali', days: 5, type: 'Adventure', date: '5 Mar 2025',  travelers: 6, cost: 45000, emoji: '⛰️' },
]

export default function SavedTripsPage() {
  const [trips,  setTrips]  = useState(SAMPLE_TRIPS)
  const [search, setSearch] = useState('')

  const filtered = trips.filter((t) => t.dest.toLowerCase().includes(search.toLowerCase()))

  function handleDelete(id) {
    setTrips(trips.filter((t) => t.id !== id))
    toast.success('Trip deleted')
  }

  function handleDownload(trip) {
    toast.success(`Downloading ${trip.dest} itinerary PDF...`)
  }

  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#f97316', marginBottom: '0.75rem' }}>💾 Saved</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Saved Trips</h2>
          <p style={{ color: '#94a3b8' }}>Your planned adventures, ready to revisit anytime</p>
        </div>

        <input
          className="form-input"
          placeholder="🔍 Search saved trips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: '1.5rem' }}
        />

        {filtered.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '0.75rem', transition: 'border-color 0.2s' }}
          >
            <span style={{ fontSize: '1.75rem' }}>{t.emoji}</span>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.2rem', fontFamily: 'DM Sans,sans-serif' }}>
                {t.dest} — {t.days} Days
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                {t.type} trip · {t.travelers} travellers · {t.date} · ₹{t.cost.toLocaleString()}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => handleDownload(t)}
                style={{ padding: '0.4rem 0.85rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'DM Sans,sans-serif', background: 'linear-gradient(135deg,#14b8a6,#0d9488)', color: '#fff', border: 'none' }}
              >
                📄 PDF
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                style={{ padding: '0.4rem 0.85rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'DM Sans,sans-serif', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                🗑️
              </button>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💾</div>
            <p>No saved trips found.</p>
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 12 }}>
          <p style={{ fontSize: '0.85rem', color: '#3b82f6' }}>
            ℹ️ Connect Supabase in <code>.env</code> to persist trips across devices and enable real PDF downloads via html2pdf.js.
          </p>
        </div>
      </div>
    </div>
  )
}
