import { useState, useEffect } from 'react'
import { getWeather, getForecast } from '../services/weatherService'

export function useWeather(city) {
  const [weather, setWeather]   = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    if (!city) return
    setLoading(true)
    Promise.all([getWeather(city), getForecast(city)])
      .then(([w, f]) => { setWeather(w); setForecast(f) })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [city])

  return { weather, forecast, loading, error }
}
