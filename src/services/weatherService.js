import axios from 'axios'
import { WEATHER_MOCK } from '../utils/data'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// Map OpenWeatherMap icon codes to emoji for a quick visual
const ICON_MAP = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️',
}

function weatherIcon(iconCode) {
  return ICON_MAP[iconCode] || '🌤️'
}

const FALLBACK = { temp: '-', feels: '-', humidity: '-', wind: '-', desc: 'N/A', icon: '❓', uv: '-', forecast: [] }

// Fetch current weather — falls back to mock data if no API key
export async function getWeather(city) {
  if (!API_KEY) {
    const w = WEATHER_MOCK[city] || WEATHER_MOCK['Goa']
    return w || FALLBACK
  }
  try {
    const { data } = await axios.get(`${BASE_URL}/weather`, {
      params: { q: `${city},IN`, appid: API_KEY, units: 'metric' },
    })

    // Fetch UV index using coordinates from weather response
    let uv = '-'
    try {
      const uvRes = await axios.get(`${BASE_URL}/uvi`, {
        params: { lat: data.coord.lat, lon: data.coord.lon, appid: API_KEY },
      })
      uv = Math.round(uvRes.data.value)
    } catch {
      // UV endpoint may fail on free tier — degrade gracefully
      uv = '-'
    }

    return {
      temp: Math.round(data.main.temp),
      feels: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6), // m/s → km/h
      desc: data.weather[0].description,
      icon: weatherIcon(data.weather[0].icon),
      uv,
      forecast: [],
    }
  } catch {
    const w = WEATHER_MOCK[city] || WEATHER_MOCK['Goa']
    return w || FALLBACK
  }
}

// Fetch 5-day / 3-hour forecast, pick one entry per day
export async function getForecast(city) {
  if (!API_KEY) {
    const f = (WEATHER_MOCK[city] || WEATHER_MOCK['Goa'])?.forecast
    return f || []
  }
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: `${city},IN`, appid: API_KEY, units: 'metric' },
    })

    // Group by day and pick midday entry (or first available)
    const days = {}
    data.list.forEach((item) => {
      const dayKey = new Date(item.dt * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
      if (!days[dayKey]) {
        days[dayKey] = {
          d: new Date(item.dt * 1000).toLocaleDateString('en', { weekday: 'short' }),
          t: Math.round(item.main.temp),
          hi: Math.round(item.main.temp_max),
          lo: Math.round(item.main.temp_min),
          i: weatherIcon(item.weather[0].icon),
          desc: item.weather[0].description,
        }
      } else {
        // Track hi/lo across the day
        days[dayKey].hi = Math.max(days[dayKey].hi, Math.round(item.main.temp_max))
        days[dayKey].lo = Math.min(days[dayKey].lo, Math.round(item.main.temp_min))
      }
    })

    return Object.values(days).slice(0, 5)
  } catch {
    const f = (WEATHER_MOCK[city] || WEATHER_MOCK['Goa'])?.forecast
    return f || []
  }
}
