import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'

export default function DestinationCard({ dest, onSave, isSaved }) {
  const navigate = useNavigate()

  return (
    <motion.div
      className="card-base"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image / Emoji */}
      <div style={{
        height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '4rem', background: 'linear-gradient(135deg,rgba(249,115,22,0.1),rgba(0,0,0,0))',
      }}>
        {dest.emoji}
      </div>

      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem' }}>{dest.name}</h3>
          <span className="badge badge-accent">{dest.category}</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text3)', marginBottom: '0.75rem' }}>📍 {dest.state}</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{dest.desc}</p>
        <StarRating rating={dest.rating} />
        <p style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: '0.4rem', marginBottom: '1rem' }}>🗓️ Best time: {dest.best}</p>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn-primary"
            style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}
            onClick={() => navigate(`/destination/${dest.name}`)}
          >
            View Details
          </button>
          <button
            className="btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}
            onClick={() => onSave?.(dest)}
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
