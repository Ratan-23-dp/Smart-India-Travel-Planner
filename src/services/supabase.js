import { supabase } from '../utils/supabase'

export { supabase }

// ── Auth ──────────────────────────────────────────────────────────────────
export const signUp = (email, password, fullName = '') =>
  supabase.auth.signUp({
    email,
    password,
    options: {
      data: fullName ? { full_name: fullName } : undefined,
    },
  })

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

// ── Reads ──────────────────────────────────────────────────────────────────
export const getDestinations = async () => {
  try {
    const { data, error } = await supabase.from('destinations').select('*').order('id')
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

export const getDestinationByName = async (name) => {
  try {
    const { data, error } = await supabase.from('destinations').select('*').ilike('name', name).maybeSingle()
    if (error) throw error
    return data || null
  } catch {
    return null
  }
}

export const getFoods = async () => {
  try {
    const { data, error } = await supabase.from('foods').select('*').order('id')
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

export const getItineraryByDestination = async (destination) => {
  try {
    const { data, error } = await supabase.from('itineraries').select('*').eq('destination', destination)
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

export const getTripTypes = async () => {
  try {
    const { data, error } = await supabase.from('trip_types').select('*')
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

export const getExpenseCategories = async () => {
  try {
    const { data, error } = await supabase.from('expense_categories').select('*')
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}
