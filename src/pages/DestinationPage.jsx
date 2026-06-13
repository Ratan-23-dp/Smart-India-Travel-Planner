import { useParams, useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import StarRating from '../components/StarRating'
import { FOODS, DESTINATIONS as LOCAL_DESTINATIONS } from '../utils/data'
import { useEffect, useState, useRef } from 'react'
import { getDestinationByName } from '../services/supabase'
import { getPlaceId, getNearbyAttractions } from '../services/attractionsService'


const MapView = lazy(() => import('../components/MapView'))

export default function DestinationPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [dest, setDest] = useState(null)

  const matchedFood = dest
    ? FOODS.filter(
      (f) =>
        f.origin.toLowerCase() === dest.name.toLowerCase() ||
        f.origin.toLowerCase() === dest.state.toLowerCase()
    )
    : []
  const localFood = matchedFood.length > 0 ? matchedFood : FOODS.slice(0, 4)

  const attractionsFetched = useRef(false)

  useEffect(() => {
    attractionsFetched.current = false
    getDestinationByName(name).then((d) => {
      const local = LOCAL_DESTINATIONS.find((ld) => ld.name.toLowerCase() === name.toLowerCase())
      if (d) {
        setDest({ ...d, image: d.image || local?.image })
      } else {
        // Fallback to local data
        if (local) setDest(local)
      }
    })
  }, [name])

  // If destination exists but has no attractions in DB, try Geoapify Places API
  useEffect(() => {
    if (!dest) return
    if (dest.attractions && dest.attractions.length) return
    if (attractionsFetched.current) return
    attractionsFetched.current = true
      ; (async () => {
        try {
          const { lat, lon } = await getPlaceId(dest.name)
          const features = await getNearbyAttractions(lat, lon, 5000, 8)
          const mapped = features.map((f) => f.properties.name).filter(Boolean)
          if (mapped.length) setDest((s) => ({ ...s, attractions: mapped }))
        } catch (e) {
          // ignore
        }
      })()
  }, [dest])

  if (!dest) return (
    <div className="page-wrapper"><div className="section-wrapper"><h2>Loading destination…</h2></div></div>
  )

  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        <button className="btn-outline" style={{ padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', marginBottom: '1.5rem', fontSize: '0.85rem' }} onClick={() => navigate('/explore')}>
          ← Back to Explore
        </button>

        {/* Hero Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ width: 180, height: 180, borderRadius: 16, overflow: 'hidden', position: 'relative', flexShrink: 0, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
            <img src={dest.image} alt={dest.name} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', fontSize: '1.8rem', background: 'rgba(15,23,42,0.6)', width: '2.8rem', height: '2.8rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {dest.emoji}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2.2rem', fontFamily: "'Playfair Display',serif", margin: 0 }}>{dest.name}</h1>
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
            {(dest.attractions || []).map((a, i) => (
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
              <div style={{ height: 120, overflow: 'hidden', position: 'relative' }}>
                <img src={f.image} alt={f.name} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '1.1rem', background: 'rgba(15,23,42,0.6)', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {f.emoji}
                </div>
              </div>
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
