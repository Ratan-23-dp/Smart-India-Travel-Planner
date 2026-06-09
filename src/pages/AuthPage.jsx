import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signIn, signUp } from '../services/supabase'
import toast from 'react-hot-toast'

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode]   = useState('login')
  const [loading, setLoading] = useState(false)
  const [form, setForm]   = useState({ name: '', email: '', password: '' })

  async function handleSubmit() {
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    try {
      if (mode === 'login') {
        const { error } = await signIn(form.email, form.password)
        if (error) throw error
        toast.success('Welcome back!')
        navigate('/profile')
      } else {
        const { error } = await signUp(form.email, form.password)
        if (error) throw error
        toast.success('Account created! Check your email to confirm.')
        navigate('/profile')
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 420, background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '2.5rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: '#f97316', marginBottom: '0.5rem' }}>
            Smart<span style={{ color: '#fbbf24' }}>India</span> Travel
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
            {mode === 'login' ? 'Sign in to access your travel plans' : 'Join Smart India Travel Planner'}
          </p>
        </div>

        {mode === 'signup' && (
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
            <input className="form-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        )}

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
        </div>

        <button
          className="btn-primary"
          disabled={loading}
          style={{ width: '100%', padding: '0.75rem', borderRadius: 12, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0', color: '#64748b', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          or
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <button
          style={{ width: '100%', padding: '0.65rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '0.9rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}
          onClick={() => toast('Google OAuth requires Supabase setup in .env')}
        >
          🌐 Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span style={{ color: '#f97316', cursor: 'pointer' }} onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </motion.div>
    </div>
  )
}
