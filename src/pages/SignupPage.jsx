import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { signUp } from '../services/supabase'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  async function handleSubmit(event) {
    event.preventDefault()

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error('Please fill out all fields')
      return
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const { error } = await signUp(form.email, form.password, form.name)
      if (error) throw error
      toast.success('Account created! Check your email to confirm.')
      navigate('/profile')
    } catch (error) {
      if ((error?.message || '').toLowerCase().includes('fetch')) {
        toast.error('Supabase connection failed. Restart the dev server and verify the project URL and anon key.')
      } else {
        toast.error(error.message || 'Unable to create account')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-shell auth-shell-reverse">
        <motion.main
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="auth-card-header">
            <span className="auth-pill auth-pill-accent">Start planning</span>
            <h2>Create your account</h2>
            <p>Set up your travel profile to save trips, compare destinations, and manage everything in one place.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label>Full Name</label>
              <input
                className="form-input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

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

            <div className="auth-grid-2">
              <div>
                <label>Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <div>
                <label>Confirm Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <button className="btn-primary auth-submit" disabled={loading} type="submit">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </motion.main>

        <motion.aside
          className="auth-hero auth-hero-signup"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="auth-brand">Smart<span>India</span> Travel</div>
          <h1>Build your travel profile and start saving every idea.</h1>
          <p>
            Store destinations, itinerary drafts, food spots, and budget plans with a single account.
          </p>

          <div className="auth-highlights">
            <div>
              <strong>Fast</strong>
              <span>Plan in minutes</span>
            </div>
            <div>
              <strong>Secure</strong>
              <span>Supabase auth</span>
            </div>
            <div>
              <strong>Shared</strong>
              <span>Trips with your group</span>
            </div>
          </div>

          <div className="auth-points">
            <div>• Keep your favorite places organized</div>
            <div>• Reuse saved budgets and itineraries</div>
            <div>• Track destinations, weather, and expenses together</div>
          </div>
        </motion.aside>
      </div>
    </div>
  )
}