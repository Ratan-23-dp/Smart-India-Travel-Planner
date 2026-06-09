import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY
const BASE_URL = 'https://api.opentripmap.com/0.1/en'

// Get place ID from city name
export async function getPlaceId(city) {
  const { data } = await axios.get(`${BASE_URL}/places/geoname`, {
    params: { name: city, country: 'IN', apikey: API_KEY },
  })
  return { lat: data.lat, lon: data.lon }
}

// Get nearby attractions by radius
export async function getNearbyAttractions(lat, lon, radius = 5000, limit = 10) {
  const { data } = await axios.get(`${BASE_URL}/places/radius`, {
    params: {
      radius,
      lon,
      lat,
      kinds: 'interesting_places',
      limit,
      apikey: API_KEY,
    },
  })
  return data.features
}

// Get attraction details
export async function getAttractionDetails(xid) {
  const { data } = await axios.get(`${BASE_URL}/places/${xid}`, {
    params: { apikey: API_KEY },
  })
  return data
}
