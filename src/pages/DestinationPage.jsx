import { useParams, useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import StarRating from '../components/StarRating'
import { DESTINATIONS, FOODS } from '../utils/data'

const MapView = lazy(() => import('../components/MapView'))

export default function DestinationPage() {
  const { name }  = useParams()
  const navigate  = useNavigate()
  const dest      = DESTINATIONS.find((d) => d.name === name) || DESTINATIONS[0]
  const localFood = FOODS.slice(0, 4)

  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        <button className="btn-outline" style={{ padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', marginBottom: '1.5rem', fontSize: '0.85rem' }} onClick={() => navigate('/explore')}>
          ← Back to Explore
        </button>

        {/* Hero Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.1),rgba(0,0,0,0))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '5rem' }}>{dest.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <h1 style={{ fontSize: '2.2rem', fontFamily: "'Playfair Display',serif" }}>{dest.name}</h1>
              <span className="badge badge-accent">{dest.category}</span>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>📍 {dest.state}, India</p>
            <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>{dest.desc}</p>
            <StarRating rating={dest.rating} />
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>🗓️ Best time: {dest.best}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="btn-primary" style={{ padding: '0.6rem 1.25rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }} onClick={() => navigate('/plan')}>Plan Trip Here</button>
            <button className="btn-outline"  style={{ padding: '0.6rem 1.25rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>❤️ Save</button>
          </div>
        </motion.div>

        {/* Attractions + Weather */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>🎯 Top Attractions</h3>
            {dest.attractions.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: i < dest.attractions.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: '0.9rem' }}>{a}</span>
              </div>
            ))}
          </div>
          <WeatherCard city={dest.name} />
        </div>

        {/* Map */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>🗺️ Interactive Map</h3>
          <Suspense fallback={<div style={{ height: 400, background: 'var(--card)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text3)' }}>Loading map...</div>}>
            <MapView lat={dest.lat} lng={dest.lng} name={dest.name} attractions={dest.attractions} />
          </Suspense>
        </div>

        {/* Local Food */}
        <h3 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>🍽️ Local Food Recommendations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
          {localFood.map((f) => (
            <div key={f.id} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', background: 'linear-gradient(135deg,rgba(20,184,166,0.1),rgba(0,0,0,0))' }}>{f.emoji}</div>
              <div style={{ padding: '1rem' }}>
                <span style={{ display: 'inline-block', background: 'rgba(20,184,166,0.15)', color: '#14b8a6', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 6, marginBottom: '0.5rem' }}>{f.category}</span>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', marginBottom: '0.3rem' }}>{f.name}</div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
