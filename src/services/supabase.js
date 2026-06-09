import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  || 'https://placeholder.supabase.co'
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Auth ──────────────────────────────────────────────────────────────────
export const signUp = (email, password) =>
  supabase.auth.signUp({ email, password })

export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const signOut = () => supabase.auth.signOut()

export const getUser = () => supabase.auth.getUser()

// ── Trips ─────────────────────────────────────────────────────────────────
export const saveTrip = (trip) =>
  supabase.from('trips').insert([trip])

export const getTrips = (userId) =>
  supabase.from('trips').select('*').eq('user_id', userId).order('created_at', { ascending: false })

export const deleteTrip = (id) =>
  supabase.from('trips').delete().eq('id', id)

// ── Expenses ─────────────────────────────────────────────────────────────
export const saveExpenseGroup = (group) =>
  supabase.from('expense_groups').insert([group])

export const getExpenseGroups = (userId) =>
  supabase.from('expense_groups').select('*').eq('user_id', userId)

export const saveExpense = (expense) =>
  supabase.from('expenses').insert([expense])

export const getExpenses = (groupId) =>
  supabase.from('expenses').select('*').eq('group_id', groupId)
