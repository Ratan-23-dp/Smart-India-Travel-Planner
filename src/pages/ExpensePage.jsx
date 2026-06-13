import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Chart, ArcElement, Tooltip, Legend, DoughnutController, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js'
import toast from 'react-hot-toast'
import { EXPENSE_CATEGORIES } from '../utils/data'
import { getExpenseCategories } from '../services/supabase'

Chart.register(ArcElement, Tooltip, Legend, DoughnutController, BarElement, CategoryScale, LinearScale, BarController)

const INITIAL_EXPENSES = [
  { id: 1, desc: 'Hotel Booking',    amount: 6000, paid: 'Rahul', category: '🏨' },
  { id: 2, desc: 'Restaurant Dinner', amount: 2400, paid: 'Priya', category: '🍽️' },
  { id: 3, desc: 'Taxi to Airport',   amount: 1200, paid: 'Amit',  category: '🚗' },
]

export default function ExpensePage() {
  const [tab,      setTab]      = useState('expenses')
  const [members,  setMembers]  = useState(['Rahul', 'Priya', 'Amit'])
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES)
  const [newMember, setNewMember] = useState('')
  const [form, setForm] = useState({ desc: '', amount: '', paid: 'Rahul', category: '🍽️' })

  const doughnutRef = useRef(null)
  const doughnutChart = useRef(null)

  const total     = expenses.reduce((s, e) => s + e.amount, 0)
  const perPerson = members.length > 0 ? Math.round(total / members.length) : 0

  // Balances
  const balances = {}
  members.forEach((m) => { balances[m] = 0 })
  expenses.forEach((e) => {
    if (balances[e.paid] !== undefined) balances[e.paid] += e.amount
    members.forEach((m) => { balances[m] -= perPerson })
  })

  // Build doughnut chart
  useEffect(() => {
    if (tab !== 'chart' || !doughnutRef.current) return
    if (doughnutChart.current) doughnutChart.current.destroy()
    const catMap = {}
    expenses.forEach((e) => { catMap[e.category] = (catMap[e.category] || 0) + e.amount })
    const LABEL_MAP = { '🍽️': 'Food', '🏨': 'Hotel', '🚗': 'Transport', '🎡': 'Activities', '🛍️': 'Shopping', '⛽': 'Fuel', '🎫': 'Entry', '💊': 'Medical' }
    doughnutChart.current = new Chart(doughnutRef.current, {
      type: 'doughnut',
      data: {
        labels: Object.keys(catMap).map((k) => LABEL_MAP[k] || k),
        datasets: [{ data: Object.values(catMap), backgroundColor: ['#f97316', '#14b8a6', '#3b82f6', '#fbbf24', '#a855f7', '#ef4444', '#10b981'], borderWidth: 0, hoverOffset: 8 }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'DM Sans' } } } } },
    })
    return () => { if (doughnutChart.current) doughnutChart.current.destroy() }
  }, [tab, expenses])

  useEffect(() => {
    getExpenseCategories().then((cats) => {
      if (cats && cats.length) {
        // map to expected format
        // cats may be [{icon,label}] or similar
      }
    })
  }, [])

  function addMember() {
    if (newMember.trim() && !members.includes(newMember.trim())) {
      setMembers([...members, newMember.trim()])
      setNewMember('')
    }
  }
  function addExpense() {
    if (!form.desc || !form.amount) { toast.error('Fill in description and amount'); return }
    setExpenses([...expenses, { ...form, id: Date.now(), amount: +form.amount }])
    setForm({ desc: '', amount: '', paid: members[0], category: '🍽️' })
    toast.success('Expense added!')
  }

  const TABS = [
    { id: 'expenses', label: '📋 Expenses' },
    { id: 'add',      label: '➕ Add' },
    { id: 'members',  label: '👥 Members' },
    { id: 'settle',   label: '💰 Settle Up' },
    { id: 'chart',    label: '📊 Chart' },
  ]

  return (
    <div className="page-wrapper">
      <div className="section-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, color: '#f97316', marginBottom: '0.75rem' }}>💸 Expense Splitter</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.8rem,3vw,2.5rem)', marginBottom: '1rem' }}>Split Expenses</h2>
          <p style={{ color: '#94a3b8' }}>Track group expenses and settle bills fairly</p>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { l: 'Total Spent', v: `₹${total.toLocaleString()}`, c: '#f97316' },
            { l: 'Per Person',  v: `₹${perPerson.toLocaleString()}`, c: '#14b8a6' },
            { l: 'Members',     v: members.length, c: '#3b82f6' },
            { l: 'Expenses',    v: expenses.length, c: '#fbbf24' },
          ].map((s) => (
            <div key={s.l} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.c, fontFamily: "'Playfair Display',serif" }}>{s.v}</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.2rem' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '2rem' }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '0.75rem 1.25rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
              border: 'none', background: 'none', fontFamily: 'DM Sans,sans-serif',
              color: tab === t.id ? '#f97316' : '#94a3b8',
              borderBottom: `2px solid ${tab === t.id ? '#f97316' : 'transparent'}`,
            }}>{t.label}</button>
          ))}
        </div>

        {/* Expenses list */}
        {tab === 'expenses' && (
          <div>
            {expenses.map((e) => (
              <motion.div key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{e.category}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{e.desc}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Paid by {e.paid} · Equal split</div>
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fbbf24' }}>₹{e.amount.toLocaleString()}</span>
                <button onClick={() => setExpenses(expenses.filter((x) => x.id !== e.id))} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: '#64748b', cursor: 'pointer', padding: '0.2rem 0.5rem' }}>✕</button>
              </motion.div>
            ))}
            {expenses.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No expenses yet.</div>}
          </div>
        )}

        {/* Add expense */}
        {tab === 'add' && (
          <div style={{ maxWidth: 500 }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Description *</label>
              <input className="form-input" placeholder="e.g. Hotel Booking" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Amount (₹) *</label>
                <input className="form-input" type="number" placeholder="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.5rem', display: 'block' }}>Paid By</label>
                <select className="form-input" value={form.paid} onChange={(e) => setForm({ ...form, paid: e.target.value })}>
                  {members.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 500, color: '#94a3b8', marginBottom: '0.75rem', display: 'block' }}>Category</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {EXPENSE_CATEGORIES.map((c) => (
                  <button key={c.icon} onClick={() => setForm({ ...form, category: c.icon })} style={{
                    padding: '0.5rem 0.75rem', borderRadius: 10, cursor: 'pointer', fontSize: '1.25rem',
                    border: '1px solid', fontFamily: 'DM Sans,sans-serif',
                    borderColor: form.category === c.icon ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.08)',
                    background:  form.category === c.icon ? 'rgba(249,115,22,0.1)' : 'transparent',
                  }}>{c.icon}</button>
                ))}
              </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', padding: '0.85rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', fontSize: '1rem' }} onClick={addExpense}>Add Expense</button>
          </div>
        )}

        {/* Members */}
        {tab === 'members' && (
          <div style={{ maxWidth: 480 }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <input className="form-input" placeholder="Add member name..." value={newMember} onChange={(e) => setNewMember(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addMember()} />
              <button className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: 10, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', whiteSpace: 'nowrap' }} onClick={addMember}>Add</button>
            </div>
            {members.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#fff', flexShrink: 0 }}>{m[0].toUpperCase()}</div>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{m}</span>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Paid: ₹{expenses.filter((e) => e.paid === m).reduce((s, e) => s + e.amount, 0).toLocaleString()}</span>
                  {members.length > 2 && <button onClick={() => setMembers(members.filter((x) => x !== m))} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, color: '#64748b', cursor: 'pointer', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>✕</button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settle */}
        {tab === 'settle' && (
          <div style={{ maxWidth: 480 }}>
            <h4 style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, marginBottom: '1rem' }}>Settlement Summary</h4>
            {members.map((m, i) => {
              const bal = Math.round(balances[m] || 0)
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{m[0].toUpperCase()}</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{m}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Net: {bal >= 0 ? 'gets back' : 'owes'} ₹{Math.abs(bal).toLocaleString()}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.95rem', fontWeight: 600, color: bal >= 0 ? '#14b8a6' : '#ef4444' }}>{bal >= 0 ? '▲' : '▼'} ₹{Math.abs(bal).toLocaleString()}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Chart */}
        {tab === 'chart' && (
          <div style={{ height: 320 }}>
            <canvas ref={doughnutRef} />
          </div>
        )}
      </div>
    </div>
  )
}
