import { getPlaceId, getNearbyAttractions } from './attractionsService'

export async function generateDynamicItinerary(cityName, daysCount) {
  try {
    // 1. Get coordinates
    const { lat, lon } = await getPlaceId(cityName)
    
    let placeNames = []
    if (lat && lon) {
      // 2. Get attractions
      const attractions = await getNearbyAttractions(lat, lon, 10000, 25)
      placeNames = attractions
        .map((f) => f.properties?.name || f.properties?.formatted)
        .filter(Boolean)
    }

    // 3. Fallback/default places if geocoder returns nothing
    const fallbackPlaces = [
      'Local Heritage Center & Markets',
      'Historical Monuments',
      'Scenic Sunrise Viewpoint',
      'Central Park & Botanical Garden',
      'Ancient Spiritual Temple/Church',
      'Local Museum & Art Gallery',
      'Traditional Handicrafts Emporium',
      'Riverside/Lake Promenade Walk',
      'Popular Shopping Street'
    ]
    const finalPlaces = placeNames.length > 0 ? placeNames : fallbackPlaces

    // 4. Distribute places over daysCount
    const days = []
    let placeIdx = 0

    const dayThemes = [
      'Introduction & Heritage Landmarks',
      'Scenic Nature & Local Exploration',
      'Culture, Museums & Local Cuisine',
      'Spiritual Sites & Relaxation',
      'Adventure, Trails & Parks',
      'Art, Markets & Shopping',
      'Souvenirs, Lake Walks & Departure'
    ]

    for (let d = 1; d <= daysCount; d++) {
      const activities = []

      // Morning Attraction
      const p1 = finalPlaces[placeIdx % finalPlaces.length]
      placeIdx++
      activities.push({
        name: p1,
        icon: '🏛️',
        type: 'place',
        desc: `Explore the beautiful grounds and rich history of ${p1}. Take in the local atmosphere and capture memorable photographs.`,
        cost: 150
      })

      // Lunch
      activities.push({
        name: `Lunch - Local Speciality Restaurant`,
        icon: '🍽️',
        type: 'food',
        desc: `Enjoy delicious, authentic regional cuisine at a highly-rated local eatery.`,
        cost: 250
      })

      // Afternoon Attraction
      const p2 = finalPlaces[placeIdx % finalPlaces.length]
      placeIdx++
      activities.push({
        name: p2,
        icon: '🌳',
        type: 'place',
        desc: `Visit ${p2}, a popular local site offering scenic views and peaceful surroundings.`,
        cost: 100
      })

      // Evening Stroll / Market
      const p3 = finalPlaces[placeIdx % finalPlaces.length]
      placeIdx++
      activities.push({
        name: `${cityName} Traditional Market Walk`,
        icon: '🛍️',
        type: 'place',
        desc: `Stroll through the vibrant local bazaar to purchase unique local handicrafts, spices, and souvenirs.`,
        cost: 0
      })

      days.push({
        day: d,
        title: dayThemes[(d - 1) % dayThemes.length] || `Exploring ${cityName}`,
        activities
      })
    }

    return days
  } catch (err) {
    console.error('Error generating itinerary', err)
    return []
  }
}
