import axios from 'axios'
import { WEATHER_MOCK } from '../utils/data'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// Fetch live weather — falls back to mock data if no API key
export async function getWeather(city) {
  if (!API_KEY) {
    return WEATHER_MOCK[city] || WEATHER_MOCK['Goa']
  }
  try {
    const { data } = await axios.get(`${BASE_URL}/weather`, {
      params: { q: `${city},IN`, appid: API_KEY, units: 'metric' },
    })
    return {
      temp: Math.round(data.main.temp),
      feels: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6),
      desc: data.weather[0].description,
      icon: '🌤️',
      uv: 7,
      forecast: [],
    }
  } catch {
    return WEATHER_MOCK[city] || WEATHER_MOCK['Goa']
  }
}

export async function getForecast(city) {
  if (!API_KEY) {
    return (WEATHER_MOCK[city] || WEATHER_MOCK['Goa']).forecast
  }
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: `${city},IN`, appid: API_KEY, units: 'metric', cnt: 5 },
    })
    return data.list.map((item) => ({
      d: new Date(item.dt * 1000).toLocaleDateString('en', { weekday: 'short' }),
      t: Math.round(item.main.temp),
      i: '🌤️',
    }))
  } catch {
    return (WEATHER_MOCK[city] || WEATHER_MOCK['Goa']).forecast
  }
}
