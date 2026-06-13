import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoadingSpinner from '../components/LoadingSpinner'
import { getDestinations, getTripTypes } from '../services/supabase'
import { DESTINATIONS as LOCAL_DESTINATIONS, TRIP_TYPES as LOCAL_TRIP_TYPES } from '../utils/data'
import { getAutocompletePlaces } from '../services/attractionsService'

// Loader steps displayed sequentially during itinerary generation
const LOADING_STEPS = [
  '🔍 Finding Attractions...',
  '🌤️ Checking Weather...',
  '🍽️ Finding Food Options...',
  '🗺️ Mapping the Route...',
  '✨ Generating Your Itinerary...',
]

export default function PlanTripPage() {
  const navigate = useNavigate()

  // 1. Form state variable holding all user selections
  const [form, setForm] = useState({
    source: '',
    destination: '',
    budget: '',
    travelers: 2,
    days: 3,
    type: ''
  })

  // 2. Loading states for progress screen
  const [loading, setLoading] = useState(false)
  const [steps, setSteps]     = useState([])

  // 3. Database states (fetched from Supabase or Fallback)
  const [destinations, setDestinations] = useState([])
  const [tripTypes, setTripTypes]       = useState([])

  // 4. Autocomplete search states
  const [destInput, setDestInput]             = useState('')
  const [suggestions, setSuggestions]         = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // 5. Popular destinations quick suggestions list
  const popularDestinations = [
    { name: 'Goa', state: 'Goa' },
    { name: 'Jaipur', state: 'Rajasthan' },
    { name: 'Manali', state: 'Himachal Pradesh' },
    { name: 'Kerala', state: 'Kerala' },
    { name: 'Mumbai', state: 'Maharashtra' },
    { name: 'Delhi', state: 'Delhi' }
  ]

  // 6. Hook: Query Geocoding autocomplete suggestions as the user types
  useEffect(() => {
    if (destInput.trim().length >= 2) {
      // Debounce API calls by 300ms to reduce server load
      const delay = setTimeout(() => {
        getAutocompletePlaces(destInput).then((res) => {
          setSuggestions(res || [])
        })
      }, 300)
      return () => clearTimeout(delay)
    } else {
      setSuggestions([])
    }
  }, [destInput])

  // 7. Handler: Execute when a user selects a destination from suggestions list
  const handleSelectSuggestion = (sug) => {
    setDestInput(sug.name)
    setForm((prev) => ({ ...prev, destination: sug.name }))
    setShowSuggestions(false)
  }

  // 8. Hook: Fetch destinations and trip types on component load
  useEffect(() => {
    getDestinations().then((d) => {
      const data = d.length > 0 ? d : LOCAL_DESTINATIONS
      const merged = data.map(item => {
        const local = LOCAL_DESTINATIONS.find(l => l.name.toLowerCase() === item.name.toLowerCase())
        return { ...item, image: item.image || local?.image }
      })
      setDestinations(merged)
    })
    getTripTypes().then((t) => {
      const mapped = t.map((x) => ({
        id: x.id || x.name,
        icon: x.icon || '🧳',
        label: x.label || x.name
      }))
      setTripTypes(mapped.length > 0 ? mapped : LOCAL_TRIP_TYPES)
    })
  }, [])

  // 9. Handler: Start generation loader, store parameters, and navigate to itinerary page
  function handleGenerate() {
    if (!form.destination || !form.budget) {
      alert('Please fill in destination and budget.')
      return
    }

    setLoading(true)
    setSteps([])
    let i = 0

    // Set interval to simulate a loading bar/steps sequence
    const intervalId = setInterval(() => {
      if (i < LOADING_STEPS.length) {
        setSteps((s) => [...s, LOADING_STEPS[i]])
        i++
      } else {
        clearInterval(intervalId)
        // Store user preferences in Session Storage so Itinerary Page can access them
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
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#f97316', marginBottom: '0.75rem' }}>🗺️ Plan</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Plan Your Trip</h2>
          <p style={{ color: '#94a3b8' }}>Fill in your preferences and we'll generate a smart personalised itinerary</p>
        </div>

        {/* Input Form Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '2rem' }}>
          
          {/* Source City / Destination Autocomplete Input Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', position: 'relative', zIndex: 10 }}>
            
            {/* Source Input */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>From (Source City)</label>
              <input className="form-input" placeholder="e.g. Patna, Mumbai..." value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
            </div>
            
            {/* Autocomplete Destination Input */}
            <div style={{ position: 'relative', zIndex: 10 }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>To (Destination) *</label>
              <input
                className="form-input"
                placeholder="Search any city in India..."
                value={destInput}
                onChange={(e) => {
                  setDestInput(e.target.value)
                  setForm({ ...form, destination: e.target.value })
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay list hiding to allow click events to register first
                  setTimeout(() => setShowSuggestions(false), 200)
                }}
              />
              {/* Floating Autocomplete Suggestions Dropdown List */}
              {showSuggestions && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0,
                  background: '#1e293b', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12, zIndex: 999, marginTop: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  maxHeight: 200, overflowY: 'auto'
                }}>
                  {suggestions.length > 0 ? (
                    suggestions.map((sug, idx) => (
                      <div
                        key={idx}
                        onMouseDown={() => handleSelectSuggestion(sug)}
                        style={{
                          padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: idx < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                          fontSize: '0.85rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span>📍</span>
                        <div>
                          <span style={{ fontWeight: 600 }}>{sug.name}</span>
                          {sug.state && <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}> ({sug.state})</span>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Popular Destinations</div>
                      {popularDestinations.map((sug, idx) => (
                        <div
                          key={idx}
                          onMouseDown={() => handleSelectSuggestion(sug)}
                          style={{
                            padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: idx < popularDestinations.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            fontSize: '0.85rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <span>🔥</span>
                          <div>
                            <span style={{ fontWeight: 600 }}>{sug.name}</span>
                            <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}> ({sug.state})</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Budget / Travelers / Days Input Fields Row */}
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

          {/* Trip Type Select Row */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.75rem', display: 'block' }}>Trip Type</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {tripTypes.map((t) => (
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

          {/* Dynamic Budget Breakdown display based on user entered budget */}
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

          {/* Submit Button */}
          <button className="btn-primary" style={{ width: '100%', padding: '0.85rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '1rem', fontWeight: 600 }} onClick={handleGenerate}>
            ✨ Generate My Itinerary
          </button>
        </motion.div>
      </div>
    </div>
  )
}
