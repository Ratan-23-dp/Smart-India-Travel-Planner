import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFoods } from '../services/supabase'
import { FOODS as LOCAL_FOODS } from '../utils/data'


// Food Explorer category filters map
const CATEGORIES = [
  { id: 'All', label: 'All' },
  { id: 'Street Food', label: 'Street Food' },
  { id: 'Traditional', label: 'Traditional' },
  { id: 'Vegetarian', label: 'Vegetarian' },
  { id: 'Dessert', label: 'Desserts' }
]

export default function FoodPage() {
  // 1. State for currently selected category filter tab
  const [category, setCategory] = useState('All')
  
  // 2. State for the food item currently selected for detailed view modal
  const [selected, setSelected] = useState(null)

  // 3. State holding food records list
  const [foods, setFoods] = useState([])

  // 4. Hook: Fetch foods from Supabase on load, merge with local list
  useEffect(() => {
    getFoods()
      .then((dbFoods) => {
        // Create a map of database foods by name for quick lookup
        const dbMap = new Map()
        dbFoods.forEach(item => {
          const lowerName = (item.name || '').trim().toLowerCase()
          if (lowerName) {
            dbMap.set(lowerName, item)
          }
        })

        // Merge: for each local food, use the DB version if it exists, otherwise the local version
        const merged = LOCAL_FOODS.map(localItem => {
          const lowerName = localItem.name.toLowerCase()
          const dbItem = dbMap.get(lowerName)
          if (dbItem) {
            return { ...localItem, ...dbItem, image: dbItem.image || localItem.image }
          }
          return localItem
        })

        // Also add any foods that are in the DB but not in the local list
        const localNames = new Set(LOCAL_FOODS.map(lf => lf.name.toLowerCase()))
        dbFoods.forEach(dbItem => {
          const lowerName = (dbItem.name || '').trim().toLowerCase()
          if (lowerName && !localNames.has(lowerName)) {
            merged.push(dbItem)
          }
        })

        setFoods(merged)
      })
      .catch(() => setFoods(LOCAL_FOODS))
  }, [])

  // 5. Compute filtered foods based on user category tab selection
  const filtered = foods.filter((f) => {
    // Step A: Strict beef & pork filter (rejects any match for security and preference)
    const nameLower = (f.name || '').toLowerCase()
    const descLower = (f.desc || '').toLowerCase()
    const ingredientsString = (f.ingredients || []).join(' ').toLowerCase()
    if (
      nameLower.includes('beef') ||
      nameLower.includes('pork') ||
      descLower.includes('beef') ||
      descLower.includes('pork') ||
      ingredientsString.includes('beef') ||
      ingredientsString.includes('pork')
    ) {
      return false
    }

    // Step B: Filter by category tab
    if (category === 'All') return true
    
    // If Vegetarian tab is active, show all items flagged with isVeg: true (includes veg street foods & desserts)
    if (category === 'Vegetarian') return f.isVeg === true
    
    // Else, perform a strict category matching check (e.g. Traditional, Street Food, Dessert)
    return f.category === category
  })

  // 6. Detailed modal view card for single selected food item
  if (selected) return (
    <div className="page-wrapper">
      <div className="section-wrapper" style={{ maxWidth: 700 }}>
        
        {/* Back Button */}
        <button className="btn-outline" style={{ padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', marginBottom: '1.5rem', fontSize: '0.85rem' }} onClick={() => setSelected(null)}>← Back</button>
        
        {/* Detail Card Container */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
            <img src={selected.image} alt={selected.name} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '2.5rem', background: 'rgba(15,23,42,0.6)', width: '4rem', height: '4rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {selected.emoji}
            </div>
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display',serif" }}>{selected.name}</h2>
              <span className="badge badge-teal">{selected.category}</span>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>🏠 Origin: {selected.origin}</p>
            <p style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>{selected.desc}</p>
            
            {/* Ingredients badges */}
            <h4 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, marginBottom: '0.75rem' }}>Ingredients</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {(selected.ingredients || []).map((ing, i) => <span key={i} className="badge badge-teal">{ing}</span>)}
            </div>
            
            {/* Technical info box */}
            <div style={{ padding: '1rem', background: 'rgba(20,184,166,0.08)', borderRadius: 12, border: '1px solid rgba(20,184,166,0.2)' }}>
              <p style={{ fontSize: '0.85rem', color: '#14b8a6', fontWeight: 500, marginBottom: '0.3rem' }}>💡 Full Project Feature</p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>TheMealDB API provides full step-by-step recipes, cooking instructions, YouTube video links and nutritional info.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  // 7. Grid listing view displaying all matching food cards
  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#14b8a6', marginBottom: '0.75rem' }}>🍽️ Food Explorer</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Taste India</h2>
          <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>Explore iconic Indian dishes, street food, recipes and regional specialities</p>
        </div>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)} style={{
              padding: '0.4rem 1rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 500,
              cursor: 'pointer', border: '1px solid', fontFamily: 'DM Sans,sans-serif',
              borderColor: category === c.id ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.08)',
              background:  category === c.id ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.06)',
              color:       category === c.id ? '#14b8a6' : '#94a3b8',
            }}>{c.label}</button>
          ))}
        </div>

        {/* Food Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1.25rem' }}>
          <AnimatePresence>
            {filtered.map((f, i) => (
              <motion.div key={f.id} initial={{ opacity: 0, scale: 0.96, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 15 }} transition={{ type: 'spring', stiffness: 260, damping: 22, delay: Math.min(i * 0.04, 0.4) }} whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setSelected(f)} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s', willChange: 'transform' }}>
                <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                  <img src={f.image} alt={f.name} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', fontSize: '1.25rem', background: 'rgba(15,23,42,0.85)', width: '2.2rem', height: '2.2rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.15)' }}>
                    {f.emoji}
                  </div>
                </div>
                <div style={{ padding: '1.1rem' }}>
                  <span style={{ display: 'inline-block', background: 'rgba(20,184,166,0.15)', color: '#14b8a6', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 6, marginBottom: '0.5rem' }}>{f.category}</span>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', marginBottom: '0.3rem' }}>{f.name}</div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '0.75rem' }}>{f.desc}</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>🏠 {f.origin}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
