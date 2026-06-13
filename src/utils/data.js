// Local fallback data for when Supabase tables are missing or empty.
// This ensures the app is fully functional out-of-the-box.

export const DESTINATIONS = [
  { id: 1,  name: 'Goa',       emoji: '🏖️', category: 'Beach',        state: 'Goa',               image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60',       desc: 'Famous for golden beaches, vibrant nightlife, Portuguese heritage, and fresh seafood. A paradise for beach lovers and party-goers.',                          rating: 4.7, best: 'Nov – Feb',  lat: 15.2993, lng: 74.124,  attractions: ['Baga Beach', 'Dudhsagar Falls', 'Fort Aguada', 'Basilica of Bom Jesus', 'Anjuna Flea Market'] },
  { id: 2,  name: 'Jaipur',    emoji: '🏰', category: 'Heritage',     state: 'Rajasthan',         image: 'https://images.pexels.com/photos/19867647/pexels-photo-19867647.jpeg', desc: 'The Pink City dazzles with majestic forts, royal palaces, colorful bazaars, and mouth-watering Rajasthani cuisine.',                                          rating: 4.6, best: 'Oct – Mar',  lat: 26.9124, lng: 75.7873, attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort'] },
  { id: 3,  name: 'Manali',    emoji: '⛰️', category: 'Hill Station', state: 'Himachal Pradesh',  image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=60',                           desc: 'Snow-capped peaks, adventure sports, hot springs, and lush green valleys make Manali the ultimate hill-station escape.',                                      rating: 4.5, best: 'Oct – Jun',  lat: 32.2396, lng: 77.1887, attractions: ['Rohtang Pass', 'Solang Valley', 'Hidimba Temple', 'Old Manali', 'Jogini Waterfall'] },
  { id: 4,  name: 'Varanasi',  emoji: '🕉️', category: 'Spiritual',    state: 'Uttar Pradesh',     image: 'https://images.pexels.com/photos/12112985/pexels-photo-12112985.jpeg', desc: 'The spiritual capital of India, with ancient ghats on the Ganges, mesmerising Ganga Aarti, and a deep connection to Hindu mythology.',                          rating: 4.4, best: 'Oct – Mar',  lat: 25.3176, lng: 83.0063, attractions: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Sarnath', 'Assi Ghat', 'Manikarnika Ghat'] },
  { id: 5,  name: 'Delhi',     emoji: '🏛️', category: 'City',         state: 'Delhi',             image: 'https://images.pexels.com/photos/16960242/pexels-photo-16960242.jpeg',                   desc: 'India\'s capital blends Mughal heritage with modern life — iconic monuments, bustling markets, and world-class street food at every corner.',                    rating: 4.3, best: 'Oct – Mar',  lat: 28.6139, lng: 77.209,  attractions: ['Red Fort', 'Qutub Minar', 'India Gate', 'Humayun\'s Tomb', 'Chandni Chowk'] },
  { id: 6,  name: 'Mumbai',    emoji: '🌆', category: 'City',         state: 'Maharashtra',       image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&auto=format&fit=crop&q=60', desc: 'The city of dreams offers Bollywood glamour, stunning colonial architecture, Marine Drive sunsets, and unbeatable vada pav.',                                   rating: 4.5, best: 'Nov – Feb',  lat: 19.076,  lng: 72.8777, attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Chhatrapati Shivaji Terminus', 'Juhu Beach'] },
  { id: 7,  name: 'Kerala',    emoji: '🌴', category: 'Nature',       state: 'Kerala',            image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop&q=60', desc: 'God\'s Own Country with serene backwaters, Ayurvedic wellness, lush tea gardens, and stunning tropical beaches.',                                              rating: 4.8, best: 'Sep – Mar',  lat: 10.8505, lng: 76.2711, attractions: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Fort Kochi', 'Periyar Wildlife Sanctuary', 'Varkala Beach'] },
  { id: 8,  name: 'Udaipur',   emoji: '🏰', category: 'Heritage',     state: 'Rajasthan',         image: 'https://images.pexels.com/photos/17547457/pexels-photo-17547457.jpeg', desc: 'The City of Lakes charms with floating palaces, shimmering lakes, and romantic sunsets — often called the Venice of the East.',                                 rating: 4.6, best: 'Sep – Mar',  lat: 24.5854, lng: 73.7125, attractions: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Sajjangarh Palace', 'Fateh Sagar Lake'] },
  { id: 9,  name: 'Rishikesh',  emoji: '🧘', category: 'Spiritual',   state: 'Uttarakhand',       image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=60', desc: 'The Yoga Capital of the World, nestled beside the Ganges, famous for white-water rafting, ashrams, and the Beatles Ashram.',                                   rating: 4.5, best: 'Sep – Nov',  lat: 30.0869, lng: 78.2676, attractions: ['Laxman Jhula', 'Ram Jhula', 'Triveni Ghat', 'Beatles Ashram', 'Neer Garh Waterfall'] },
  { id: 10, name: 'Darjeeling', emoji: '🍵', category: 'Hill Station', state: 'West Bengal',       image: 'https://images.unsplash.com/photo-1557958114-3d2440207108?w=600&auto=format&fit=crop&q=60', desc: 'Queen of the Hills with world-famous tea gardens, Himalayan sunrise at Tiger Hill, and the charming toy train ride.',                                          rating: 4.4, best: 'Mar – May',  lat: 27.041,  lng: 88.2663, attractions: ['Tiger Hill', 'Batasia Loop', 'Darjeeling Himalayan Railway', 'Peace Pagoda', 'Happy Valley Tea Estate'] },
  { id: 11, name: 'Agra',      emoji: '🕌', category: 'Heritage',     state: 'Uttar Pradesh',     image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=60', desc: 'Home to the Taj Mahal — one of the seven wonders of the world — along with imposing Mughal forts and gardens.',                                                rating: 4.7, best: 'Oct – Mar',  lat: 27.1767, lng: 78.0081, attractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Itimad-ud-Daulah'] },
  { id: 12, name: 'Shimla',    emoji: '🏔️', category: 'Hill Station', state: 'Himachal Pradesh',  image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60', desc: 'The erstwhile summer capital of British India, known for colonial architecture, Mall Road, and stunning mountain views.',                                      rating: 4.3, best: 'Mar – Jun',  lat: 31.1048, lng: 77.1734, attractions: ['The Ridge', 'Mall Road', 'Jakhoo Temple', 'Christ Church', 'Kufri'] },
]

export const FOODS = [
  // Goa
  { id: 1,  name: 'Goan Fish Curry',  emoji: '🐟', category: 'Traditional', origin: 'Goa',               image: 'https://images.pexels.com/photos/35267289/pexels-photo-35267289.jpeg',                         desc: 'Spicy and tangy curry made with fresh fish, coconut milk, tamarind, and local red chillies.', ingredients: ['Fish', 'Coconut milk', 'Tamarind', 'Kashmiri Chillies', 'Coriander seeds'], isVeg: false },
  { id: 2,  name: 'Bebinca',          emoji: '🍰', category: 'Dessert',     origin: 'Goa',               image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=60',                                             desc: 'Traditional multi-layered Goan cake made with coconut milk, egg yolks, ghee, and sugar.', ingredients: ['Coconut milk', 'Egg yolks', 'Flour', 'Sugar', 'Ghee', 'Cardamom'], isVeg: false },
  { id: 3,  name: 'Chicken Cafreal',  emoji: '🍗', category: 'Traditional', origin: 'Goa',               image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=60',                                       desc: 'Spicy chicken dish marinated in a fresh paste of coriander, green chillies, and local spices.', ingredients: ['Chicken', 'Coriander', 'Green Chillies', 'Ginger-Garlic', 'Tamarind', 'Garam Masala'], isVeg: false },

  // Jaipur & Udaipur (Rajasthan)
  { id: 4,  name: 'Dal Baati Churma', emoji: '🫓', category: 'Traditional', origin: 'Rajasthan',         image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=60',                                             desc: 'Baked wheat balls served with spicy mixed lentil curry and sweetened crushed wheat.', ingredients: ['Wheat flour', 'Mixed lentils', 'Ghee', 'Jaggery', 'Panch Phoron'], isVeg: true },
  { id: 5,  name: 'Pyaz Kachori',     emoji: '🥯', category: 'Street Food',  origin: 'Rajasthan',         image: 'https://images.pexels.com/photos/31109618/pexels-photo-31109618.jpeg',                                               desc: 'Crispy deep-fried pastry filled with a spicy onion filling, served with sweet & sour chutneys.', ingredients: ['Maida', 'Onion', 'Fennel seeds', 'Amchur', 'Green Chili', 'Ghee'], isVeg: true },
  { id: 6,  name: 'Ghevar',           emoji: '🍯', category: 'Dessert',     origin: 'Rajasthan',         image: 'https://images.pexels.com/photos/18488314/pexels-photo-18488314.jpeg',                                                 desc: 'Disc-shaped sweet cake soaked in sugar syrup and topped with rabri and dry fruits.', ingredients: ['Flour', 'Ghee', 'Milk', 'Sugar Syrup', 'Saffron', 'Pistachios'], isVeg: true },

  // Manali & Shimla (Himachal Pradesh)
  { id: 7,  name: 'Siddu',            emoji: '🥟', category: 'Traditional', origin: 'Himachal Pradesh',  image: 'https://images.pexels.com/photos/10379166/pexels-photo-10379166.jpeg',                                       desc: 'Steamed yeast bread stuffed with a savory filling of poppy seeds or lentils, served with ghee.', ingredients: ['Wheat flour', 'Yeast', 'Poppy seeds/Lentils', 'Garlic', 'Green Chili', 'Ghee'], isVeg: true },
  { id: 8,  name: 'Madra',            emoji: '🍲', category: 'Traditional', origin: 'Himachal Pradesh',  image: 'https://images.pexels.com/photos/33643298/pexels-photo-33643298.jpeg',                                   desc: 'Slow-cooked chickpeas or kidney beans in a rich yogurt-based gravy with cardamom and cloves.', ingredients: ['Kabuli Chana', 'Yogurt', 'Ghee', 'Cloves', 'Cardamom', 'Coriander powder'], isVeg: true },
  { id: 9,  name: 'Babru',            emoji: '🥞', category: 'Street Food',  origin: 'Himachal Pradesh',  image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&auto=format&fit=crop&q=60',                                               desc: 'Deep-fried flatbread stuffed with spiced black gram daal paste, similar to kachori.', ingredients: ['Wheat flour', 'Black gram daal', 'Spices', 'Oil'], isVeg: true },

  // Varanasi & Agra (Uttar Pradesh)
  { id: 10, name: 'Banarasi Paan',    emoji: '🍃', category: 'Street Food',  origin: 'Uttar Pradesh',     image: 'https://images.pexels.com/photos/1362916/pexels-photo-1362916.jpeg', desc: 'Betel leaf filled with areca nut, gulkand, kattha, and spices — a historic mouth freshener.', ingredients: ['Betel leaf', 'Gulkand', 'Areca nut', 'Saunf', 'Cardamom'], isVeg: true },
  { id: 11, name: 'Petha',            emoji: '🍬', category: 'Dessert',     origin: 'Uttar Pradesh',     image: 'https://images.pexels.com/photos/35254697/pexels-photo-35254697.jpeg',                       desc: 'Translucent, soft candy made from ash gourd (winter melon) soaked in flavored sugar syrup.', ingredients: ['Ash Gourd', 'Sugar', 'Lime', 'Rose Water/Saffron'], isVeg: true },
  { id: 12, name: 'Bedai Alu Sabzi',  emoji: '🍛', category: 'Traditional', origin: 'Uttar Pradesh',     image: 'https://images.pexels.com/photos/36651769/pexels-photo-36651769.jpeg',                                               desc: 'Crispy fried kachori served with spicy potato curry and curd, popular breakfast.', ingredients: ['Urad dal', 'Wheat flour', 'Potato', 'Ginger', 'Chili', 'Asafoetida'], isVeg: true },
  { id: 13, name: 'Jalebi',           emoji: '🥨', category: 'Dessert',     origin: 'Uttar Pradesh',     image: 'https://images.pexels.com/photos/36215924/pexels-photo-36215924.jpeg',                                                 desc: 'Spirally-shaped deep-fried batter soaked in saffron sugar syrup — crispy and sweet.', ingredients: ['Maida', 'Yogurt', 'Saffron', 'Sugar', 'Cardamom', 'Ghee'], isVeg: true },

  // Delhi
  { id: 14, name: 'Butter Chicken',   emoji: '🍗', category: 'Traditional', origin: 'Delhi',             image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=60', desc: 'Tender chicken in a rich, creamy tomato-based gravy with aromatic spices.', ingredients: ['Chicken', 'Tomato', 'Butter', 'Cream', 'Garam Masala', 'Kasuri Methi'], isVeg: false },
  { id: 15, name: 'Chole Bhature',    emoji: '🫓', category: 'Street Food',  origin: 'Delhi',             image: 'https://images.pexels.com/photos/36388454/pexels-photo-36388454.jpeg',                                   desc: 'Spicy chickpea curry paired with deep-fried fluffy leavened bread.', ingredients: ['Focus', 'Maida', 'Onion', 'Tomato', 'Chole Masala', 'Green Chili'], isVeg: true },
  { id: 16, name: 'Aloo Tikki',       emoji: '🥔', category: 'Street Food',  origin: 'Delhi',             image: 'https://images.pexels.com/photos/10102480/pexels-photo-10102480.jpeg', desc: 'Crispy fried potato patties served with sweet and spicy chutneys and yogurt.', ingredients: ['Potato', 'Bread crumbs', 'Tamarind chutney', 'Mint chutney', 'Yogurt', 'Spices'], isVeg: true },

  // Mumbai
  { id: 17, name: 'Pav Bhaji',        emoji: '🍞', category: 'Street Food',  origin: 'Mumbai',            image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=60',                   desc: 'Spiced mashed vegetable curry served with buttered pav (bread rolls) — iconic street food.', ingredients: ['Potato', 'Peas', 'Capsicum', 'Tomato', 'Butter', 'Pav Bhaji Masala'], isVeg: true },
  { id: 18, name: 'Vada Pav',         emoji: '🥔', category: 'Street Food',  origin: 'Mumbai',            image: 'https://images.pexels.com/photos/36926107/pexels-photo-36926107.jpeg',                                             desc: 'Spiced potato fritter sandwiched in a pav bun with spicy garlic chutney.', ingredients: ['Potato', 'Besan', 'Green Chili', 'Garlic', 'Mustard Seeds', 'Pav'], isVeg: true },
  { id: 19, name: 'Pani Puri',        emoji: '💧', category: 'Street Food',  origin: 'Mumbai',            image: 'https://images.pexels.com/photos/13063312/pexels-photo-13063312.jpeg',                                             desc: 'Crispy hollow semolina puris filled with spiced mint water, sweet chutney, and potatoes.', ingredients: ['Semolina', 'Tamarind', 'Mint', 'Potato', 'Chickpeas', 'Chili'], isVeg: true },

  // Kerala
  { id: 20, name: 'Appam with Stew',  emoji: '🥞', category: 'Traditional', origin: 'Kerala',            image: 'https://images.pexels.com/photos/10810716/pexels-photo-10810716.jpeg', desc: 'Soft-centered, lacy rice pancakes served with a mild, aromatic coconut milk vegetable stew.', ingredients: ['Rice', 'Coconut milk', 'Yeast', 'Mixed vegetables', 'Ginger', 'Curry Leaves'], isVeg: true },
  { id: 21, name: 'Karimeen',         emoji: '🐠', category: 'Traditional', origin: 'Kerala',            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=60',                             desc: 'Pearl spot fish marinated in spices, wrapped in banana leaf, and pan-fried to perfection.', ingredients: ['Pearl spot fish', 'Shallots', 'Ginger-Garlic', 'Chili powder', 'Coconut oil', 'Banana leaf'], isVeg: false },
  { id: 22, name: 'Malabar Parotta',  emoji: '🍛', category: 'Traditional', origin: 'Kerala',            image: 'https://images.pexels.com/photos/35071820/pexels-photo-35071820.jpeg', desc: 'Flaky, layered flatbread served with a highly spiced, slow-cooked chicken or mutton gravy.', ingredients: ['Maida', 'Oil/Ghee', 'Chicken/Mutton', 'Coconut slices', 'Spices', 'Curry Leaves'], isVeg: false },

  // Rishikesh (Uttarakhand)
  { id: 23, name: 'Aloo Ke Gutke',    emoji: '🥔', category: 'Vegetarian',  origin: 'Uttarakhand',       image: 'https://images.pexels.com/photos/36343375/pexels-photo-36343375.jpeg',                                           desc: 'Boiled potatoes sautéed in mustard oil with local aromatic spices and red chillies.', ingredients: ['Potato', 'Mustard oil', 'Jakhya (Cleome seeds)', 'Turmeric', 'Chili powder'], isVeg: true },
  { id: 24, name: 'Kafuli',           emoji: '🥬', category: 'Vegetarian',  origin: 'Uttarakhand',       image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=60',                                     desc: 'Thick green gravy made of spinach and fenugreek leaves, cooked in an iron kadhai.', ingredients: ['Spinach', 'Fenugreek leaves', 'Rice paste', 'Ginger', 'Green chili', 'Mustard oil'], isVeg: true },
  { id: 25, name: 'Singori',          emoji: '🍦', category: 'Dessert',     origin: 'Uttarakhand',       image: 'https://images.pexels.com/photos/36346842/pexels-photo-36346842.jpeg',               desc: 'Sweet milk-solid (khoya) dessert wrapped in Maalu leaves, imparting a unique flavor.', ingredients: ['Khoya', 'Grated coconut', 'Sugar', 'Maalu leaf'], isVeg: true },

  // Darjeeling (West Bengal)
  { id: 26, name: 'Veg Momos',        emoji: '🥟', category: 'Street Food',  origin: 'West Bengal',       image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=60',                                       desc: 'Steamed dumplings filled with finely chopped vegetables, served with spicy tomato chutney.', ingredients: ['Maida', 'Cabbage', 'Carrot', 'Onion', 'Ginger', 'Soy sauce'], isVeg: true },
  { id: 27, name: 'Thukpa',           emoji: '🍜', category: 'Traditional', origin: 'West Bengal',       image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=60',                                                 desc: 'Nourishing hot noodle soup cooked with fresh vegetables, spices, and green herbs.', ingredients: ['Noodles', 'Broth', 'Mixed vegetables', 'Garlic', 'Ginger', 'Soy sauce'], isVeg: true },
  { id: 28, name: 'Rasgulla',         emoji: '⚪', category: 'Dessert',     origin: 'West Bengal',       image: 'https://images.pexels.com/photos/8788869/pexels-photo-8788869.jpeg', desc: 'Soft, spongy cheese balls soaked in a light, sweet sugar syrup.', ingredients: ['Chhena', 'Sugar', 'Cardamom', 'Rose Water'], isVeg: true },
]

export const WEATHER_MOCK = {
  Goa:      { temp: 32, feels: 35, humidity: 75, wind: 18, desc: 'Partly cloudy', icon: '⛅', uv: 8, forecast: [{ d: 'Mon', t: 32, i: '⛅' }, { d: 'Tue', t: 31, i: '🌦️' }, { d: 'Wed', t: 30, i: '🌧️' }, { d: 'Thu', t: 31, i: '⛅' }, { d: 'Fri', t: 33, i: '☀️' }] },
  Jaipur:   { temp: 38, feels: 42, humidity: 30, wind: 12, desc: 'Sunny',         icon: '☀️', uv: 10, forecast: [{ d: 'Mon', t: 38, i: '☀️' }, { d: 'Tue', t: 39, i: '☀️' }, { d: 'Wed', t: 37, i: '⛅' }, { d: 'Thu', t: 36, i: '⛅' }, { d: 'Fri', t: 38, i: '☀️' }] },
  Manali:   { temp: 18, feels: 16, humidity: 60, wind: 15, desc: 'Cool breeze',   icon: '🌤️', uv: 5,  forecast: [{ d: 'Mon', t: 18, i: '🌤️' }, { d: 'Tue', t: 16, i: '🌧️' }, { d: 'Wed', t: 14, i: '🌧️' }, { d: 'Thu', t: 17, i: '⛅' }, { d: 'Fri', t: 19, i: '☀️' }] },
  Varanasi: { temp: 35, feels: 38, humidity: 55, wind: 10, desc: 'Hazy sun',      icon: '🌤️', uv: 9,  forecast: [{ d: 'Mon', t: 35, i: '🌤️' }, { d: 'Tue', t: 34, i: '⛅' }, { d: 'Wed', t: 33, i: '🌦️' }, { d: 'Thu', t: 34, i: '⛅' }, { d: 'Fri', t: 36, i: '☀️' }] },
  Delhi:    { temp: 36, feels: 40, humidity: 40, wind: 14, desc: 'Hot and dry',    icon: '☀️', uv: 10, forecast: [{ d: 'Mon', t: 36, i: '☀️' }, { d: 'Tue', t: 37, i: '☀️' }, { d: 'Wed', t: 35, i: '⛅' }, { d: 'Thu', t: 34, i: '⛅' }, { d: 'Fri', t: 36, i: '☀️' }] },
  Mumbai:   { temp: 30, feels: 34, humidity: 80, wind: 22, desc: 'Humid',          icon: '⛅', uv: 7,  forecast: [{ d: 'Mon', t: 30, i: '⛅' }, { d: 'Tue', t: 29, i: '🌧️' }, { d: 'Wed', t: 28, i: '🌧️' }, { d: 'Thu', t: 30, i: '🌦️' }, { d: 'Fri', t: 31, i: '⛅' }] },
}

export const ITINERARY_TEMPLATES = {
  Goa: [
    {
      day: 1, title: 'Beach Day & Fort Exploration',
      activities: [
        { name: 'Baga Beach',             icon: '🏖️', type: 'place', desc: 'Relax on the golden sands, try water sports, and soak up the Goan vibes.', cost: 0 },
        { name: 'Lunch at Britto\'s',      icon: '🍽️', type: 'food',  desc: 'Iconic beachfront restaurant for Goan seafood and cold drinks.', cost: 800 },
        { name: 'Fort Aguada',            icon: '🏰', type: 'place', desc: 'Explore the 17th-century Portuguese fort with stunning ocean views.', cost: 0 },
        { name: 'Sunset at Anjuna Beach', icon: '🌅', type: 'place', desc: 'Watch the sunset while enjoying a shack meal on Anjuna shore.', cost: 500 },
      ],
    },
    {
      day: 2, title: 'Heritage & Waterfalls',
      activities: [
        { name: 'Basilica of Bom Jesus',    icon: '⛪', type: 'place', desc: 'UNESCO World Heritage Site housing the remains of St. Francis Xavier.', cost: 0 },
        { name: 'Se Cathedral',              icon: '🏛️', type: 'place', desc: 'One of the largest churches in Asia with beautiful Portuguese architecture.', cost: 0 },
        { name: 'Lunch — Goan Fish Thali',   icon: '🍽️', type: 'food',  desc: 'Traditional Goan fish thali with rice, curry, and sol kadhi.', cost: 600 },
        { name: 'Dudhsagar Falls',           icon: '💧', type: 'place', desc: 'Majestic four-tiered waterfall at the Goa-Karnataka border.', cost: 1200 },
      ],
    },
    {
      day: 3, title: 'Markets & Departure',
      activities: [
        { name: 'Anjuna Flea Market',        icon: '🛍️', type: 'place', desc: 'Shop for souvenirs, clothes, spices, and handicrafts.', cost: 1000 },
        { name: 'Panjim City Walk',          icon: '🚶', type: 'place', desc: 'Explore the charming Latin Quarter of Fontainhas with colourful houses.', cost: 0 },
        { name: 'Farewell Lunch',            icon: '🍽️', type: 'food',  desc: 'Enjoy pork vindaloo and bebinca at a riverside restaurant.', cost: 700 },
      ],
    },
  ],
  Jaipur: [
    {
      day: 1, title: 'Royal Forts & Palaces',
      activities: [
        { name: 'Amber Fort',              icon: '🏰', type: 'place', desc: 'Magnificent hilltop fort with intricate mirror work and panoramic views.', cost: 500 },
        { name: 'Rajasthani Thali Lunch',  icon: '🍽️', type: 'food',  desc: 'Authentic Rajasthani thali with dal baati churma at a heritage restaurant.', cost: 600 },
        { name: 'Hawa Mahal',              icon: '🏰', type: 'place', desc: 'The Palace of Winds with 953 honeycomb windows — Jaipur\'s icon.', cost: 200 },
        { name: 'City Palace',             icon: '🏛️', type: 'place', desc: 'The royal residence with museums, courtyards, and gardens.', cost: 500 },
      ],
    },
    {
      day: 2, title: 'Culture & Shopping',
      activities: [
        { name: 'Jantar Mantar',            icon: '🔭', type: 'place', desc: 'UNESCO-listed astronomical observation site with massive instruments.', cost: 200 },
        { name: 'Nahargarh Fort',           icon: '🏰', type: 'place', desc: 'Stunning sunset views over the Pink City from this hilltop fort.', cost: 200 },
        { name: 'Lunch — Laal Maas',        icon: '🍽️', type: 'food',  desc: 'Fiery Rajasthani mutton curry with bajra roti.', cost: 500 },
        { name: 'Johari Bazaar',            icon: '🛍️', type: 'place', desc: 'Shop for traditional jewellery, bangles, and Jaipuri textiles.', cost: 1500 },
      ],
    },
  ],
}

export const TRIP_TYPES = [
  { id: 'solo',     icon: '🎒', label: 'Solo' },
  { id: 'couple',   icon: '💑', label: 'Couple' },
  { id: 'friends',  icon: '👫', label: 'Friends' },
  { id: 'family',   icon: '👨‍👩‍👧‍👦', label: 'Family' },
  { id: 'adventure', icon: '🧗', label: 'Adventure' },
  { id: 'spiritual', icon: '🕉️', label: 'Spiritual' },
]

export const EXPENSE_CATEGORIES = [
  { icon: '🍽️', label: 'Food' },
  { icon: '🏨', label: 'Hotel' },
  { icon: '🚗', label: 'Transport' },
  { icon: '🎡', label: 'Activities' },
  { icon: '🛍️', label: 'Shopping' },
  { icon: '⛽', label: 'Fuel' },
  { icon: '🎫', label: 'Entry' },
  { icon: '💊', label: 'Medical' },
]
