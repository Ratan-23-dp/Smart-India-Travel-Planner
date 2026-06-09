export const DESTINATIONS = [
  { id: 1, name: 'Goa', emoji: '🏖️', desc: 'Sun-kissed beaches, vibrant nightlife, Portuguese heritage and coconut-fringed shores.', rating: 4.8, category: 'Beach', best: 'Nov–Mar', state: 'Goa', lat: 15.2993, lng: 74.1240, attractions: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls', 'Anjuna Flea Market'] },
  { id: 2, name: 'Jaipur', emoji: '🏰', desc: 'The Pink City — majestic forts, colourful bazaars and royal Rajput heritage.', rating: 4.7, category: 'Heritage', best: 'Oct–Mar', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar'] },
  { id: 3, name: 'Manali', emoji: '⛰️', desc: 'Snow-capped Himalayas, adventure sports, apple orchards and riverside serenity.', rating: 4.6, category: 'Hill Station', best: 'Dec–Feb, Jun–Sep', state: 'Himachal Pradesh', lat: 32.2432, lng: 77.1892, attractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali'] },
  { id: 4, name: 'Delhi', emoji: '🕌', desc: "India's capital — a tapestry of Mughal grandeur, colonial boulevards and modern hustle.", rating: 4.5, category: 'Heritage', best: 'Oct–Mar', state: 'Delhi', lat: 28.6139, lng: 77.2090, attractions: ['Red Fort', 'Qutub Minar', 'India Gate', 'Lotus Temple'] },
  { id: 5, name: 'Mumbai', emoji: '🌆', desc: 'The City of Dreams — Bollywood, Marine Drive sunsets and street food paradise.', rating: 4.6, category: 'City', best: 'Oct–Feb', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Juhu Beach'] },
  { id: 6, name: 'Varanasi', emoji: '🪔', desc: 'The spiritual capital of India — ancient ghats, Ganga Aarti and timeless rituals.', rating: 4.7, category: 'Spiritual', best: 'Oct–Mar', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739, attractions: ['Dashashwamedh Ghat', 'Kashi Vishwanath', 'Sarnath', 'Manikarnika Ghat'] },
  { id: 7, name: 'Patna', emoji: '🏛️', desc: 'Ancient city on the Ganges — Mauryan Empire history, vibrant culture and riverside charm.', rating: 4.3, category: 'Heritage', best: 'Oct–Feb', state: 'Bihar', lat: 25.5941, lng: 85.1376, attractions: ['Golghar', 'Patna Museum', 'Mahavir Mandir', 'Gandhi Ghat'] },
  { id: 8, name: 'Kerala', emoji: '🌴', desc: "God's Own Country — backwaters, spice plantations, Ayurveda and tropical paradise.", rating: 4.9, category: 'Nature', best: 'Sep–Mar', state: 'Kerala', lat: 10.8505, lng: 76.2711, attractions: ['Alleppey Backwaters', 'Munnar', 'Wayanad', 'Kovalam Beach'] },
  { id: 9, name: 'Agra', emoji: '🕍', desc: "Home to the eternal Taj Mahal — the world's greatest monument to love.", rating: 4.8, category: 'Heritage', best: 'Oct–Mar', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081, attractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'] },
]

export const FOODS = [
  { id: 1, name: 'Biryani', emoji: '🍚', category: 'Traditional', desc: 'Fragrant basmati rice layered with spiced meat, saffron and caramelised onions.', origin: 'Hyderabad', ingredients: ['Basmati Rice', 'Mutton', 'Saffron', 'Spices', 'Onions', 'Mint'] },
  { id: 2, name: 'Butter Chicken', emoji: '🍗', category: 'Traditional', desc: "Tender chicken in a rich, creamy tomato sauce — India's most beloved curry.", origin: 'Delhi', ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Butter', 'Spices', 'Fenugreek'] },
  { id: 3, name: 'Masala Dosa', emoji: '🫓', category: 'Street Food', desc: 'Crispy fermented crepe filled with spiced potato masala, served with chutneys.', origin: 'South India', ingredients: ['Rice', 'Lentils', 'Potato', 'Mustard Seeds', 'Curry Leaves', 'Coconut Chutney'] },
  { id: 4, name: 'Pani Puri', emoji: '🫙', category: 'Street Food', desc: 'Hollow crispy shells filled with tangy tamarind water and spiced chickpeas.', origin: 'Mumbai', ingredients: ['Wheat', 'Chickpeas', 'Tamarind', 'Mint', 'Cumin', 'Chilli'] },
  { id: 5, name: 'Gulab Jamun', emoji: '🍮', category: 'Dessert', desc: 'Soft milk-solid dumplings soaked in fragrant rose and cardamom sugar syrup.', origin: 'Bengal', ingredients: ['Milk Solids', 'Flour', 'Sugar', 'Rose Water', 'Cardamom', 'Saffron'] },
  { id: 6, name: 'Palak Paneer', emoji: '🥬', category: 'Vegetarian', desc: 'Creamy spinach curry with cubes of fresh cottage cheese.', origin: 'Punjab', ingredients: ['Spinach', 'Paneer', 'Tomatoes', 'Cream', 'Garlic', 'Spices'] },
  { id: 7, name: 'Chole Bhature', emoji: '🫘', category: 'Street Food', desc: 'Fluffy fried bread served with spicy chickpea curry — a beloved Punjabi breakfast.', origin: 'Punjab', ingredients: ['Chickpeas', 'Flour', 'Onions', 'Tomatoes', 'Spices', 'Pomegranate'] },
  { id: 8, name: 'Rasgulla', emoji: '🍥', category: 'Dessert', desc: "Spongy cottage cheese balls soaked in light sugar syrup — Bengal's pride.", origin: 'Bengal', ingredients: ['Chena', 'Sugar', 'Rose Water', 'Cardamom', 'Semolina'] },
]

export const WEATHER_MOCK = {
  Goa:      { temp: 32, feels: 35, humidity: 78, wind: 14, desc: 'Sunny & Humid',          icon: '☀️',  uv: 9,  forecast: [{ d: 'Mon', t: 33, i: '☀️' }, { d: 'Tue', t: 31, i: '⛅' }, { d: 'Wed', t: 30, i: '🌧️' }, { d: 'Thu', t: 32, i: '☀️' }, { d: 'Fri', t: 33, i: '☀️' }] },
  Jaipur:   { temp: 28, feels: 30, humidity: 35, wind: 18, desc: 'Clear & Dry',            icon: '🌤️', uv: 10, forecast: [{ d: 'Mon', t: 28, i: '🌤️' }, { d: 'Tue', t: 30, i: '☀️' }, { d: 'Wed', t: 29, i: '🌤️' }, { d: 'Thu', t: 27, i: '⛅' }, { d: 'Fri', t: 28, i: '☀️' }] },
  Manali:   { temp: 8,  feels: 4,  humidity: 60, wind: 22, desc: 'Cold & Partly Cloudy',   icon: '❄️',  uv: 6,  forecast: [{ d: 'Mon', t: 8,  i: '❄️' }, { d: 'Tue', t: 6,  i: '🌨️' }, { d: 'Wed', t: 10, i: '⛅' }, { d: 'Thu', t: 7,  i: '❄️' }, { d: 'Fri', t: 9,  i: '⛅' }] },
  Delhi:    { temp: 38, feels: 42, humidity: 42, wind: 12, desc: 'Hot & Hazy',             icon: '🌫️', uv: 11, forecast: [{ d: 'Mon', t: 38, i: '🌫️' }, { d: 'Tue', t: 40, i: '☀️' }, { d: 'Wed', t: 37, i: '🌤️' }, { d: 'Thu', t: 36, i: '⛅' }, { d: 'Fri', t: 38, i: '☀️' }] },
  Mumbai:   { temp: 30, feels: 36, humidity: 82, wind: 20, desc: 'Humid & Overcast',       icon: '⛅',  uv: 7,  forecast: [{ d: 'Mon', t: 30, i: '⛅' }, { d: 'Tue', t: 29, i: '🌧️' }, { d: 'Wed', t: 28, i: '🌧️' }, { d: 'Thu', t: 30, i: '⛅' }, { d: 'Fri', t: 31, i: '🌤️' }] },
  Varanasi: { temp: 35, feels: 38, humidity: 55, wind: 10, desc: 'Warm & Clear',           icon: '☀️',  uv: 10, forecast: [{ d: 'Mon', t: 35, i: '☀️' }, { d: 'Tue', t: 36, i: '☀️' }, { d: 'Wed', t: 34, i: '⛅' }, { d: 'Thu', t: 33, i: '🌤️' }, { d: 'Fri', t: 35, i: '☀️' }] },
  Patna:    { temp: 33, feels: 37, humidity: 60, wind: 11, desc: 'Hot & Humid',            icon: '🌤️', uv: 9,  forecast: [{ d: 'Mon', t: 33, i: '🌤️' }, { d: 'Tue', t: 35, i: '☀️' }, { d: 'Wed', t: 32, i: '⛅' }, { d: 'Thu', t: 30, i: '🌧️' }, { d: 'Fri', t: 31, i: '⛅' }] },
  Kerala:   { temp: 27, feels: 31, humidity: 85, wind: 16, desc: 'Tropical & Lush',        icon: '🌦️', uv: 7,  forecast: [{ d: 'Mon', t: 27, i: '🌦️' }, { d: 'Tue', t: 28, i: '🌧️' }, { d: 'Wed', t: 26, i: '⛅' }, { d: 'Thu', t: 27, i: '🌦️' }, { d: 'Fri', t: 28, i: '⛅' }] },
  Agra:     { temp: 36, feels: 40, humidity: 45, wind: 13, desc: 'Sunny & Dry',            icon: '☀️',  uv: 10, forecast: [{ d: 'Mon', t: 36, i: '☀️' }, { d: 'Tue', t: 38, i: '☀️' }, { d: 'Wed', t: 35, i: '🌤️' }, { d: 'Thu', t: 34, i: '⛅' }, { d: 'Fri', t: 36, i: '☀️' }] },
}

export const ITINERARY_TEMPLATES = {
  Goa: [
    {
      day: 1, title: 'Arrival & North Goa Beaches',
      activities: [
        { type: 'place', icon: '🏖️', name: 'Baga Beach', desc: 'Golden sands, water sports, beach shacks and stunning sunsets.', cost: 0 },
        { type: 'food',  icon: '🦞', name: 'Fiesta Restaurant', desc: 'Fresh seafood – Prawn Balchão and fish curry rice.', cost: 800 },
        { type: 'hotel', icon: '🏨', name: 'Beachside Hotel', desc: 'Check-in at hotel near Calangute. Rest and refresh.', cost: 2500 },
      ],
    },
    {
      day: 2, title: 'Forts, History & Markets',
      activities: [
        { type: 'place', icon: '🏰', name: 'Fort Aguada', desc: '16th-century Portuguese fort with panoramic sea views.', cost: 100 },
        { type: 'place', icon: '🛍️', name: 'Anjuna Flea Market', desc: 'Shop for handicrafts, clothes, jewellery and souvenirs.', cost: 500 },
        { type: 'food',  icon: '🍺', name: 'Thalassa Greek Restaurant', desc: 'Fresh seafood and cocktails by the beach.', cost: 1200 },
      ],
    },
    {
      day: 3, title: 'Waterfalls & Old Goa',
      activities: [
        { type: 'place', icon: '💧', name: 'Dudhsagar Falls', desc: 'Spectacular four-tiered waterfall deep in the Western Ghats.', cost: 400 },
        { type: 'place', icon: '⛪', name: 'Basilica of Bom Jesus', desc: 'UNESCO World Heritage church in Old Goa.', cost: 50 },
        { type: 'food',  icon: '🥥', name: 'Ritz Classic', desc: 'Authentic Goan fish thali with sol kadhi.', cost: 600 },
      ],
    },
  ],
  Jaipur: [
    {
      day: 1, title: 'The Pink City Gems',
      activities: [
        { type: 'place', icon: '🏰', name: 'Amber Fort', desc: 'Magnificent hilltop fort with mirror palace. Elephant ride optional.', cost: 550 },
        { type: 'food',  icon: '🍛', name: 'Chokhi Dhani', desc: 'Traditional Rajasthani thali – Dal Baati Churma.', cost: 900 },
        { type: 'hotel', icon: '🏨', name: 'Heritage Haveli', desc: 'Authentic Rajasthani haveli stay near Jal Mahal.', cost: 3000 },
      ],
    },
    {
      day: 2, title: 'Royal Palaces & Bazaars',
      activities: [
        { type: 'place', icon: '👑', name: 'City Palace', desc: 'Royal residence – still home to the Jaipur royal family.', cost: 500 },
        { type: 'place', icon: '🪟', name: 'Hawa Mahal', desc: 'Palace of Winds — iconic honeycomb pink façade.', cost: 200 },
        { type: 'food',  icon: '🧁', name: 'LMB Restaurant', desc: 'Famous Rajasthani sweets and traditional breakfast.', cost: 500 },
      ],
    },
    {
      day: 3, title: 'Science, Gems & Sunset',
      activities: [
        { type: 'place', icon: '🔭', name: 'Jantar Mantar', desc: "UNESCO heritage — world's largest stone sundial observatory.", cost: 200 },
        { type: 'place', icon: '💎', name: 'Johari Bazaar', desc: 'Shop for gems, silver jewellery and Rajasthani textiles.', cost: 1500 },
        { type: 'food',  icon: '🫓', name: 'Rawat Mishthan', desc: 'Famous pyaaz ki kachori and jalebis.', cost: 200 },
      ],
    },
  ],
}

export const TRIP_TYPES = [
  { id: 'Solo',      icon: '🧳', label: 'Solo' },
  { id: 'Family',    icon: '👨‍👩‍👧‍👦', label: 'Family' },
  { id: 'Friends',   icon: '👫', label: 'Friends' },
  { id: 'Couple',    icon: '💑', label: 'Couple' },
  { id: 'Adventure', icon: '🧗', label: 'Adventure' },
]

export const EXPENSE_CATEGORIES = [
  { icon: '🍽️', label: 'Food' },
  { icon: '🏨', label: 'Hotel' },
  { icon: '🚗', label: 'Transport' },
  { icon: '🎡', label: 'Activities' },
  { icon: '🛍️', label: 'Shopping' },
  { icon: '⛽', label: 'Fuel' },
  { icon: '🎫', label: 'Entry Fee' },
  { icon: '💊', label: 'Medical' },
]
