import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ITINERARY_TEMPLATES, DESTINATIONS as LOCAL_DESTINATIONS } from '../utils/data'
import { useWeather } from '../hooks/useWeather'
import toast from 'react-hot-toast'
import html2pdf from 'html2pdf.js'
import { useRef, useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { saveTrip, getDestinationByName, getItineraryByDestination } from '../services/supabase'
import { generateDynamicItinerary } from '../services/itineraryService'


export default function ItineraryPage() {
  const navigate  = useNavigate()
  const pdfRef    = useRef(null)
  
  // 1. Get logged-in user details from Auth Context
  const { user }  = useAuth()
  
  // 2. Load the trip preferences stored in Session Storage
  const tripData  = JSON.parse(sessionStorage.getItem('tripData') || '{}')
  
  // 3. Set state variables for destination details and itinerary days list
  const [dest, setDest] = useState({ name: tripData.destination || 'Unknown' })
  const [itinerary, setItinerary] = useState([])

  // 4. Fetch live weather using OpenWeatherMap custom hook
  const { weather } = useWeather(tripData.destination)

  // 5. Load itinerary and destination details when the page loads (Component Mount)
  useEffect(() => {
    if (!tripData.destination) return

    // Step A: Fetch destination general details (state, description, emoji)
    getDestinationByName(tripData.destination).then((dbDest) => {
      const local = LOCAL_DESTINATIONS.find((ld) => ld.name.toLowerCase() === tripData.destination.toLowerCase())
      if (dbDest) {
        setDest({ ...dbDest, image: dbDest.image || local?.image })
      } else {
        // Fallback using the user input name if not found in database
        setDest(local || { name: tripData.destination })
      }
    })

    // Step B: Fetch itinerary (Day by Day details)
    getItineraryByDestination(tripData.destination).then((dbItinerary) => {
      if (dbItinerary && dbItinerary.length > 0) {
        // Option 1: If custom itinerary exists in Supabase DB
        setItinerary(dbItinerary)
      } else {
        // Option 2: Fallback to local hardcoded templates (Goa/Jaipur)
        const localTemplate = ITINERARY_TEMPLATES[tripData.destination]
        if (localTemplate) {
          setItinerary(localTemplate)
        } else {
          // Option 3: Dynamically generate itinerary on-the-fly for any Indian city
          generateDynamicItinerary(tripData.destination, tripData.days || 3).then((dynamicItinerary) => {
            setItinerary(dynamicItinerary)
          })
        }
      }
    })
  }, [])

  // 6. Extract form inputs
  const budget    = +tripData.budget  || 15000
  const travelers = +tripData.travelers || 2
  const weatherTemp = weather?.temp ?? '-'
  const weatherDesc = weather?.desc ?? 'N/A'

  // Helper Function: Calculate total itinerary cost using simple loops (instead of complex .reduce)
  // Easy to explain to teachers!
  function calculateTotalCost(daysList, countTravelers) {
    if (!Array.isArray(daysList)) return 0
    let total = 0
    for (let day of daysList) {
      if (day.activities) {
        for (let act of day.activities) {
          total += (act.cost || 0)
        }
      }
    }
    return total * countTravelers
  }

  // Helper Function: Calculate total cost for a single day
  function calculateDayCost(dayItem, countTravelers) {
    if (!dayItem || !dayItem.activities) return 0
    let total = 0
    for (let act of dayItem.activities) {
      total += (act.cost || 0)
    }
    return total * countTravelers
  }

  const totalCost = calculateTotalCost(itinerary, travelers)

  // 7. Handler to export/download PDF
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

  // 8. Handler to save trip to Supabase Database
  function handleSave() {
    if (!user) {
      toast.error('Please login to save your trip.')
      return
    }

    const tripToSave = {
      user_id: user.id,
      source: tripData.source || '',
      destination: tripData.destination,
      budget: +tripData.budget || 0,
      travelers: +tripData.travelers || 1,
      days: +tripData.days || 3,
      type: tripData.type || 'Friends'
    }

    saveTrip(tripToSave).then(({ error }) => {
      if (error) {
        console.error('Save trip error:', error)
        toast.error('Failed to save trip to Supabase.')
      } else {
        toast.success('Trip saved successfully!')
      }
    })
  }

  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        
        {/* Top Header Section */}
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

        {/* Itinerary Container to Export as PDF */}
        <div ref={pdfRef}>
          
          {/* Header Banner Image */}
          <div style={{ width: '100%', height: 220, borderRadius: 16, overflow: 'hidden', position: 'relative', marginBottom: '2rem', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            <img src={dest.image} alt={dest.name} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.9), transparent)' }}></div>
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2rem', background: 'rgba(255,255,255,0.1)', width: '3.2rem', height: '3.2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
                {dest.emoji || '🏕️'}
              </div>
              <div>
                <h1 style={{ fontSize: '1.6rem', fontFamily: "'Playfair Display',serif", color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)', margin: 0 }}>
                  Exploring {dest.name}
                </h1>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.5)', marginTop: '0.2rem' }}>
                  📍 {dest.state || 'India'} · {tripData.type || 'Friends'} Trip
                </p>
              </div>
            </div>
          </div>

          {/* Summary Dashboard Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { icon: '📍', label: 'Destination',    val: dest.name },
              { icon: '🌤️', label: 'Weather',        val: `${weatherTemp}°C ${weatherDesc}` },
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

          {/* Budget Visual Progress Bar */}
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

          {/* Empty State Fallback */}
          {itinerary.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <p>No itinerary template available for {dest.name} yet. Try Goa or Jaipur!</p>
            </div>
          )}

          {/* Render Day Wise Lists */}
          {itinerary.map((day, di) => (
            <motion.div key={di} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: di * 0.15 }} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, marginBottom: '1.25rem', overflow: 'hidden' }}>
              
              {/* Day Title Bar */}
              <div style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.2),rgba(251,191,36,0.1))', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: '#f97316' }}>Day {day.day}</div>
                  <h3 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '1rem' }}>{day.title}</h3>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  ₹{calculateDayCost(day, travelers)} total
                </div>
              </div>
              
              {/* Day Activities List */}
              <div style={{ padding: '1.5rem' }}>
                {(day.activities || []).map((act, ai) => (
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

        {/* Footer Navigation Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-outline" style={{ padding: '0.75rem 2rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }} onClick={() => navigate('/plan')}>Plan Another Trip</button>
          <button className="btn-teal" style={{ padding: '0.75rem 2rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }} onClick={() => navigate('/expense')}>Track Expenses</button>
        </div>
        
      </div>
    </div>
  )
}
