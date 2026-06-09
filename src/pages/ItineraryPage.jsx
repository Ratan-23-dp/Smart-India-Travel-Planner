import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DESTINATIONS, ITINERARY_TEMPLATES, WEATHER_MOCK } from '../utils/data'
import toast from 'react-hot-toast'
import html2pdf from 'html2pdf.js'
import { useRef } from 'react'

export default function ItineraryPage() {
  const navigate  = useNavigate()
  const pdfRef    = useRef(null)
  const tripData  = JSON.parse(sessionStorage.getItem('tripData') || '{}')
  const dest      = DESTINATIONS.find((d) => d.name === tripData.destination) || DESTINATIONS[0]
  const weather   = WEATHER_MOCK[dest.name] || WEATHER_MOCK.Goa
  const itinerary = ITINERARY_TEMPLATES[dest.name] || ITINERARY_TEMPLATES.Goa
  const budget    = +tripData.budget  || 15000
  const travelers = +tripData.travelers || 2

  const totalCost = itinerary.reduce((sum, day) => sum + day.activities.reduce((s, a) => s + a.cost, 0), 0) * travelers

  function handleDownloadPDF() {
    const opt = {
      margin: 0.5,
      filename: `${dest.name}-itinerary.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    }
    html2pdf().set(opt).from(pdfRef.current).save()
    toast.success('PDF downloaded!')
  }

  function handleSave() {
    toast.success('Trip saved! Connect Supabase to persist across devices.')
  }

  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#f97316', marginBottom: '0.5rem' }}>✨ Your Itinerary</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem' }}>{tripData.days || 3} Days in {dest.name}</h2>
            <p style={{ color: '#94a3b8', marginTop: '0.3rem' }}>{tripData.type || 'Friends'} trip · {travelers} traveller{travelers > 1 ? 's' : ''}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-outline" style={{ padding: '0.5rem 1.1rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '0.85rem' }} onClick={handleSave}>💾 Save Trip</button>
            <button className="btn-primary" style={{ padding: '0.5rem 1.1rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '0.85rem' }} onClick={handleDownloadPDF}>📄 Download PDF</button>
          </div>
        </div>

        <div ref={pdfRef}>
          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { icon: '📍', label: 'Destination',    val: dest.name },
              { icon: '🌤️', label: 'Weather',        val: `${weather.temp}°C ${weather.desc}` },
              { icon: '💰', label: 'Est. Total Cost', val: `₹${totalCost.toLocaleString()}` },
              { icon: '👤', label: 'Per Person',      val: `₹${Math.round(totalCost / travelers).toLocaleString()}` },
              { icon: '📅', label: 'Duration',        val: `${tripData.days || 3} Days` },
              { icon: '🎯', label: 'Trip Type',       val: tripData.type || 'Friends' },
            ].map((s) => (
              <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{s.icon}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.2rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Budget bar */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Budget Usage</span>
              <span style={{ fontSize: '0.85rem', color: '#f97316' }}>₹{Math.min(totalCost, budget).toLocaleString()} / ₹{budget.toLocaleString()}</span>
            </div>
            <div style={{ height: 6, background: 'var(--card)', borderRadius: 3, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, Math.round(totalCost / budget * 100))}%` }} transition={{ duration: 1, ease: 'easeOut' }} style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#f97316,#fbbf24)' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>{Math.min(100, Math.round(totalCost / budget * 100))}% of budget used</div>
          </div>

          {/* Day cards */}
          {itinerary.map((day, di) => (
            <motion.div key={di} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: di * 0.15 }} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, marginBottom: '1.25rem', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.2),rgba(251,191,36,0.1))', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#f97316' }}>Day {day.day}</div>
                  <h3 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '1rem' }}>{day.title}</h3>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  ₹{day.activities.reduce((s, a) => s + a.cost, 0) * travelers} total
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                {day.activities.map((act, ai) => (
                  <div key={ai} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0,
                      background: act.type === 'place' ? 'rgba(249,115,22,0.15)' : act.type === 'food' ? 'rgba(20,184,166,0.15)' : 'rgba(59,130,246,0.15)',
                    }}>
                      {act.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.2rem', fontFamily: 'DM Sans,sans-serif' }}>{act.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{act.desc}</p>
                      {act.cost > 0
                        ? <p style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '0.3rem' }}>💰 ₹{(act.cost * travelers).toLocaleString()} (for {travelers} people)</p>
                        : <p style={{ fontSize: '0.75rem', color: '#14b8a6', marginTop: '0.3rem' }}>✅ Free Entry</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-outline" style={{ padding: '0.75rem 2rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }} onClick={() => navigate('/plan')}>Plan Another Trip</button>
          <button className="btn-teal" style={{ padding: '0.75rem 2rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }} onClick={() => navigate('/expense')}>Track Expenses</button>
        </div>
      </div>
    </div>
  )
}
