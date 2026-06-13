import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signIn } from '../services/supabase'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', remember: true })

  async function handleSubmit(event) {
    event.preventDefault()

    if (!form.email || !form.password) {
      toast.error('Please enter your email and password')
      return
    }

    setLoading(true)
    try {
      const { error } = await signIn(form.email, form.password)
      if (error) throw error
      toast.success('Welcome back!')
      navigate('/profile')
    } catch (error) {
      if ((error?.message || '').toLowerCase().includes('fetch')) {
        toast.error('Supabase connection failed. Restart the dev server and verify the project URL and anon key.')
      } else {
        toast.error(error.message || 'Unable to sign in')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-shell">
        <motion.aside
          className="auth-hero auth-hero-login"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="auth-brand">Smart<span>India</span> Travel</div>
          <h1>Continue your next journey without starting over.</h1>
          <p>
            Pick up saved itineraries, track expenses, and keep your destination research in one place.
          </p>

          <div className="auth-highlights">
            <div>
              <strong>12K+</strong>
              <span>Trips planned</span>
            </div>
            <div>
              <strong>150+</strong>
              <span>Destinations</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Traveler rating</span>
            </div>
          </div>

          <div className="auth-points">
            <div>• Save and revisit your trip plans</div>
            <div>• Keep expenses organized by group</div>
            <div>• See nearby attractions, food, and weather in one view</div>
          </div>
        </motion.aside>

        <motion.main
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="auth-card-header">
            <span className="auth-pill">Welcome back</span>
            <h2>Sign in to your account</h2>
            <p>Access your saved trips, itinerary tools, and personal travel dashboard.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label>Email Address</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="auth-row">
              <label className="auth-check">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                />
                Remember me
              </label>
              <button type="button" className="auth-link" onClick={() => toast('Password reset is not configured yet')}>
                Forgot password?
              </button>
            </div>

            <button className="btn-primary auth-submit" disabled={loading} type="submit">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </motion.main>
      </div>
    </div>
  )
}