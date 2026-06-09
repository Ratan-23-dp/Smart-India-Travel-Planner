import { useState } from 'react'
import { motion } from 'framer-motion'
import DestinationCard from '../components/DestinationCard'
import { DESTINATIONS } from '../utils/data'
import toast from 'react-hot-toast'

const CATEGORIES = ['All', 'Beach', 'Heritage', 'Hill Station', 'City', 'Spiritual', 'Nature']

export default function ExplorePage() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [saved,    setSaved]    = useState([])

  const filtered = DESTINATIONS.filter((d) =>
    (category === 'All' || d.category === category) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleSave(dest) {
    setSaved((prev) =>
      prev.includes(dest.id) ? prev.filter((x) => x !== dest.id) : [...prev, dest.id]
    )
    toast.success(saved.includes(dest.id) ? 'Removed from saved' : `${dest.name} saved!`)
  }

  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#f97316', marginBottom: '0.75rem' }}>🔍 Explore</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Discover Destinations</h2>
          <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>Find your perfect Indian adventure from our curated collection</p>
        </div>

        {/* Search */}
        <input
          className="form-input"
          placeholder="🔍 Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: '1.5rem' }}
        />

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 500,
                cursor: 'pointer', border: '1px solid', transition: 'all 0.2s', fontFamily: 'DM Sans,sans-serif',
                borderColor: category === c ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.08)',
                background:   category === c ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.06)',
                color:        category === c ? '#f97316' : '#94a3b8',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem' }}>
          {filtered.map((dest, i) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <DestinationCard dest={dest} onSave={handleSave} isSaved={saved.includes(dest.id)} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p>No destinations found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
