import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoadingSpinner from '../components/LoadingSpinner'
import { DESTINATIONS, TRIP_TYPES } from '../utils/data'

const LOADING_STEPS = [
  '🔍 Finding Attractions...',
  '🌤️ Checking Weather...',
  '🍽️ Finding Food Options...',
  '🗺️ Mapping the Route...',
  '✨ Generating Your Itinerary...',
]

export default function PlanTripPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ source: '', destination: 'Goa', budget: '', travelers: 2, days: 3, type: 'Friends' })
  const [loading, setLoading]   = useState(false)
  const [steps,   setSteps]     = useState([])

  function handleGenerate() {
    if (!form.destination || !form.budget) { alert('Please fill in destination and budget.'); return }
    setLoading(true)
    setSteps([])
    let i = 0
    const id = setInterval(() => {
      if (i < LOADING_STEPS.length) { setSteps((s) => [...s, LOADING_STEPS[i]]); i++ }
      else {
        clearInterval(id)
        sessionStorage.setItem('tripData', JSON.stringify(form))
        navigate('/itinerary')
      }
    }, 700)
  }

  if (loading) return <LoadingSpinner steps={steps} title="Planning Your Trip" />

  const budget = +form.budget || 0

  return (
    <div className="page-wrapper">
      <div className="section-wrapper" style={{ maxWidth: 760 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#f97316', marginBottom: '0.75rem' }}>🗺️ Plan</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Plan Your Trip</h2>
          <p style={{ color: '#94a3b8' }}>Fill in your preferences and we'll generate a smart personalised itinerary</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '2rem' }}>
          {/* From / To */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>From (Source City)</label>
              <input className="form-input" placeholder="e.g. Patna, Mumbai..." value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>To (Destination) *</label>
              <select className="form-input" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })}>
                {DESTINATIONS.map((d) => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>

          {/* Budget / Travelers / Days */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Total Budget (₹) *</label>
              <input className="form-input" type="number" placeholder="e.g. 15000" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Travellers</label>
              <select className="form-input" value={form.travelers} onChange={(e) => setForm({ ...form, travelers: +e.target.value })}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Number of Days</label>
              <select className="form-input" value={form.days} onChange={(e) => setForm({ ...form, days: +e.target.value })}>
                {[1, 2, 3, 4, 5, 6, 7, 10].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>

          {/* Trip Type */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.75rem', display: 'block' }}>Trip Type</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {TRIP_TYPES.map((t) => (
                <button key={t.id} onClick={() => setForm({ ...form, type: t.id })} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
                  padding: '0.75rem 1.25rem', borderRadius: 12, cursor: 'pointer',
                  border: '1px solid', transition: 'all 0.2s', fontFamily: 'DM Sans,sans-serif', fontSize: '0.8rem', fontWeight: 500,
                  borderColor: form.type === t.id ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.08)',
                  background:  form.type === t.id ? 'rgba(249,115,22,0.1)'  : 'rgba(255,255,255,0.04)',
                  color:       form.type === t.id ? '#f97316' : '#94a3b8',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Breakdown */}
          {budget > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', color: '#94a3b8' }}>💡 Budget Breakdown</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '1rem', textAlign: 'center' }}>
                {[
                  { l: 'Per Person', v: `₹${Math.round(budget / form.travelers).toLocaleString()}` },
                  { l: 'Hotel (~35%)', v: `₹${Math.round(budget * 0.35).toLocaleString()}` },
                  { l: 'Food (~25%)', v: `₹${Math.round(budget * 0.25).toLocaleString()}` },
                  { l: 'Activities (~20%)', v: `₹${Math.round(budget * 0.2).toLocaleString()}` },
                  { l: 'Transport (~20%)', v: `₹${Math.round(budget * 0.2).toLocaleString()}` },
                ].map((s) => (
                  <div key={s.l}>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f97316' }}>{s.v}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <button className="btn-primary" style={{ width: '100%', padding: '0.85rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '1rem', fontWeight: 600 }} onClick={handleGenerate}>
            ✨ Generate My Itinerary
          </button>
        </motion.div>
      </div>
    </div>
  )
}
