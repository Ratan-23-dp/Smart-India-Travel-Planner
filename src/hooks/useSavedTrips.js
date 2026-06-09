import { useState, useEffect } from 'react'
import { getTrips, saveTrip, deleteTrip } from '../services/supabase'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export function useSavedTrips() {
  const { user } = useAuth()
  const [trips, setTrips]   = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getTrips(user.id)
      .then(({ data }) => setTrips(data || []))
      .finally(() => setLoading(false))
  }, [user])

  async function addTrip(trip) {
    if (!user) { toast.error('Please login to save trips'); return }
    const { error } = await saveTrip({ ...trip, user_id: user.id })
    if (error) { toast.error('Failed to save trip'); return }
    toast.success('Trip saved!')
    setTrips((prev) => [trip, ...prev])
  }

  async function removeTrip(id) {
    await deleteTrip(id)
    setTrips((prev) => prev.filter((t) => t.id !== id))
    toast.success('Trip deleted')
  }

  return { trips, loading, addTrip, removeTrip }
}
