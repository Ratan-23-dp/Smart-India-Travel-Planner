import { motion } from 'framer-motion'

export default function LoadingSpinner({ steps = [], title = 'Loading...' }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(10,15,30,0.97)',
      zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '1.5rem',
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 48, height: 48,
          border: '3px solid rgba(255,255,255,0.08)',
          borderTopColor: '#f97316',
          borderRadius: '50%',
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: '1rem', fontSize: '1.2rem' }}>{title}</h3>
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              fontSize: '0.9rem',
              color: i === steps.length - 1 ? '#f97316' : '#14b8a6',
              marginBottom: '0.4rem',
              fontWeight: i === steps.length - 1 ? 500 : 400,
            }}
          >
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
