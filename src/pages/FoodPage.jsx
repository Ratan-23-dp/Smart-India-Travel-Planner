import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FOODS } from '../utils/data'

const CATEGORIES = ['All', 'Street Food', 'Traditional', 'Vegetarian', 'Dessert']

export default function FoodPage() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = FOODS.filter((f) => category === 'All' || f.category === category)

  if (selected) return (
    <div className="page-wrapper">
      <div className="section-wrapper" style={{ maxWidth: 700 }}>
        <button className="btn-outline" style={{ padding: '0.4rem 1rem', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', marginBottom: '1.5rem', fontSize: '0.85rem' }} onClick={() => setSelected(null)}>← Back</button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', background: 'linear-gradient(135deg,rgba(20,184,166,0.1),rgba(0,0,0,0))' }}>
            {selected.emoji}
          </div>
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display',serif" }}>{selected.name}</h2>
              <span className="badge badge-teal">{selected.category}</span>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>🏠 Origin: {selected.origin}</p>
            <p style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>{selected.desc}</p>
            <h4 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, marginBottom: '0.75rem' }}>Ingredients</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {selected.ingredients.map((ing, i) => <span key={i} className="badge badge-teal">{ing}</span>)}
            </div>
            <div style={{ padding: '1rem', background: 'rgba(20,184,166,0.08)', borderRadius: 12, border: '1px solid rgba(20,184,166,0.2)' }}>
              <p style={{ fontSize: '0.85rem', color: '#14b8a6', fontWeight: 500, marginBottom: '0.3rem' }}>💡 Full Project Feature</p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>TheMealDB API provides full step-by-step recipes, cooking instructions, YouTube video links and nutritional info.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#14b8a6', marginBottom: '0.75rem' }}>🍽️ Food Explorer</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Taste India</h2>
          <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>Explore iconic Indian dishes, street food, recipes and regional specialities</p>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: '0.4rem 1rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 500,
              cursor: 'pointer', border: '1px solid', fontFamily: 'DM Sans,sans-serif',
              borderColor: category === c ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.08)',
              background:  category === c ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.06)',
              color:       category === c ? '#14b8a6' : '#94a3b8',
            }}>{c}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1.25rem' }}>
          <AnimatePresence>
            {filtered.map((f, i) => (
              <motion.div key={f.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }}
                onClick={() => setSelected(f)} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', background: 'linear-gradient(135deg,rgba(20,184,166,0.1),rgba(0,0,0,0))' }}>{f.emoji}</div>
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
