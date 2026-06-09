import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { signOut } from '../services/supabase'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    toast.success('Logged out!')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="page-wrapper">
        <div className="section-wrapper" style={{ maxWidth: 760, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👤</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', marginBottom: '1rem' }}>Sign In to Access Profile</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Create an account to save trips, track expenses and more.</p>
          <button
            className="btn-primary"
            style={{ padding: '0.75rem 2rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '1rem' }}
            onClick={() => navigate('/auth')}
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    )
  }

  const username = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Traveller'

  return (
    <div className="page-wrapper">
      <div className="section-wrapper" style={{ maxWidth: 760 }}>

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.15),rgba(251,191,36,0.05))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#fff', flexShrink: 0 }}>
            {username[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display',serif", marginBottom: '0.3rem' }}>{username}</h2>
            <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>{user.email}</p>
            <span className="badge badge-accent">🌟 Explorer</span>
          </div>
          <button
            className="btn-outline"
            style={{ padding: '0.5rem 1.1rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '0.85rem' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { val: '3',    lbl: 'Saved Trips' },
            { val: '₹78K', lbl: 'Total Spent' },
            { val: '9',    lbl: 'Destinations' },
          ].map((s) => (
            <div key={s.lbl} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: "'Playfair Display',serif", color: '#f97316' }}>{s.val}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Favourite Destinations */}
        <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, marginBottom: '1rem' }}>🎯 Favourite Destinations</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['Goa 🏖️', 'Jaipur 🏰', 'Manali ⛰️'].map((d) => (
              <span key={d} className="badge badge-accent" style={{ padding: '0.4rem 0.9rem' }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="glass-card">
          <h4 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, marginBottom: '1rem' }}>⚙️ Account Settings</h4>
          {['🔔 Notifications', '🌙 Dark Mode', '🔒 Privacy Settings', '📧 Email Preferences'].map((s) => (
            <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '0.9rem' }}>{s}</span>
              <button style={{ padding: '0.3rem 0.75rem', borderRadius: 7, cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'DM Sans,sans-serif', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}>Manage</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
