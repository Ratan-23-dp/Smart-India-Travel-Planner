import axios from 'axios'

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY
const GEOCODE_URL = 'https://api.geoapify.com/v1/geocode/search'
const PLACES_URL = 'https://api.geoapify.com/v2/places'

// Get place coordinates from city name using Geoapify Geocoding
export async function getPlaceId(city) {
  if (!API_KEY) return { lat: null, lon: null }
  try {
    const { data } = await axios.get(GEOCODE_URL, {
      params: { text: city, country: 'IN', limit: 1, apiKey: API_KEY },
    })
    const first = data?.features?.[0]
    if (!first) return { lat: null, lon: null }
    return { lat: first.geometry.coordinates[1], lon: first.geometry.coordinates[0] }
  } catch (err) {
    console.error('Geoapify geocode error', err?.message || err)
    return { lat: null, lon: null }
  }
}

// Get nearby attractions by radius using Geoapify Places API
export async function getNearbyAttractions(lat, lon, radius = 5000, limit = 10) {
  if (!API_KEY || !lat || !lon) return []
  try {
    const categories = 'tourism.sights,tourism.museum,tourism.attraction,tourism.historic'
    const filter = `circle:${lon},${lat},${radius}`
    const { data } = await axios.get(PLACES_URL, {
      params: {
        categories,
        filter,
        limit,
        apiKey: API_KEY,
      },
    })
    // Geoapify returns either `features` or `results` depending on version; normalize
    const results = data?.features || data?.results || []
    return results
  } catch (err) {
    console.error('Geoapify places error', err?.message || err)
    return []
  }
}

// Get attraction/place details by id (Geoapify place id)
export async function getAttractionDetails(id) {
  if (!API_KEY || !id) return null
  try {
    // Geoapify doesn't have a single-resource endpoint universally available; use a filter by id
    const { data } = await axios.get(PLACES_URL, {
      params: {
        filter: `id:${id}`,
        apiKey: API_KEY,
      },
    })
    const first = data?.features?.[0] || data?.results?.[0]
    return first || null
  } catch (err) {
    console.error('Geoapify place details error', err?.message || err)
    return null
  }
}

// Autocomplete cities/places in India using Geoapify Autocomplete API
export async function getAutocompletePlaces(text) {
  if (!API_KEY || !text || text.length < 2) return []
  try {
    const { data } = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
      params: {
        text,
        filter: 'countrycode:in',
        type: 'city',
        limit: 5,
        apiKey: API_KEY,
      },
    })
    const features = data?.features || []
    return features.map((f) => {
      const p = f.properties
      return {
        name: p.city || p.name || p.formatted,
        state: p.state || '',
        formatted: p.formatted,
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
      }
    })
  } catch (err) {
    console.error('Geoapify autocomplete error', err?.message || err)
    return []
  }
}
