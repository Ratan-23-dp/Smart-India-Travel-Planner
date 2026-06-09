import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { signOut } from '../services/supabase'
import toast from 'react-hot-toast'

const NAV_LINKS = [
  { path: '/',        label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/plan',    label: 'Plan Trip' },
  { path: '/food',    label: 'Food' },
  { path: '/expense', label: 'Expense Splitter' },
  { path: '/saved',   label: 'Saved Trips' },
  { path: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user }  = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await signOut()
    toast.success('Logged out!')
    navigate('/')
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(10,15,30,0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      height: 64, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 2rem',
    }}>
      {/* Logo */}
      <Link to="/" style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', fontWeight: 700, color: '#f97316', textDecoration: 'none' }}>
        Smart<span style={{ color: '#fbbf24' }}>India</span> Travel
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '0.25rem' }} className="hidden md:flex">
        {NAV_LINKS.map(({ path, label }) => (
          <Link key={path} to={path} style={{
            padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.85rem', fontWeight: 500,
            color: location.pathname === path ? '#f97316' : '#94a3b8',
            background: location.pathname === path ? 'rgba(249,115,22,0.15)' : 'transparent',
            textDecoration: 'none', transition: 'all 0.2s',
          }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Auth buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{user.email?.split('@')[0]}</span>
            <button className="btn-outline" style={{ padding: '0.4rem 1rem', borderRadius: 8, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth" style={{ padding: '0.4rem 1rem', borderRadius: 8, fontSize: '0.82rem', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>Login</Link>
            <Link to="/auth" style={{ padding: '0.4rem 1rem', borderRadius: 8, fontSize: '0.82rem', background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', textDecoration: 'none', fontWeight: 500 }}>Sign Up</Link>
          </>
        )}
        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer', display: 'none' }} className="md:hidden">☰</button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: 64, left: 0, right: 0,
              background: 'rgba(10,15,30,0.97)', borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '1rem',
            }}
          >
            {NAV_LINKS.map(({ path, label }) => (
              <Link key={path} to={path} onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '0.75rem 1rem', borderRadius: 8,
                color: location.pathname === path ? '#f97316' : '#94a3b8',
                textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
              }}>
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
