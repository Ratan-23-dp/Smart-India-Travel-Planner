import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

// Read env variables
const envFile = fs.readFileSync('.env.local', 'utf8')
const env = {}
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length) {
    env[key.trim()] = valueParts.join('=').trim()
  }
})

const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseKey = env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const DESTINATIONS = [
  { id: 1,  name: 'Goa',       image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60' },
  { id: 2,  name: 'Jaipur',    image: 'https://images.pexels.com/photos/19867647/pexels-photo-19867647.jpeg' },
  { id: 3,  name: 'Manali',    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=60' },
  { id: 4,  name: 'Varanasi',  image: 'https://images.pexels.com/photos/12112985/pexels-photo-12112985.jpeg' },
  { id: 5,  name: 'Delhi',     image: 'https://images.pexels.com/photos/16960242/pexels-photo-16960242.jpeg' },
  { id: 6,  name: 'Mumbai',    image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&auto=format&fit=crop&q=60' },
  { id: 7,  name: 'Kerala',    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop&q=60' },
  { id: 8,  name: 'Udaipur',   image: 'https://images.pexels.com/photos/17547457/pexels-photo-17547457.jpeg' },
  { id: 9,  name: 'Rishikesh',  image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=60' },
  { id: 10, name: 'Darjeeling', image: 'https://images.unsplash.com/photo-1557958114-3d2440207108?w=600&auto=format&fit=crop&q=60' },
  { id: 11, name: 'Agra',      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=60' },
  { id: 12, name: 'Shimla',    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60' },
]

const FOODS = [
  { id: 1,  name: 'Goan Fish Curry',  image: 'https://images.pexels.com/photos/35267289/pexels-photo-35267289.jpeg' },
  { id: 2,  name: 'Bebinca',          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=60' },
  { id: 3,  name: 'Chicken Cafreal',  image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=60' },
  { id: 4,  name: 'Dal Baati Churma', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=60' },
  { id: 5,  name: 'Pyaz Kachori',     image: 'https://images.pexels.com/photos/31109618/pexels-photo-31109618.jpeg' },
  { id: 6,  name: 'Ghevar',           image: 'https://images.pexels.com/photos/18488314/pexels-photo-18488314.jpeg' },
  { id: 7,  name: 'Siddu',            image: 'https://images.pexels.com/photos/10379166/pexels-photo-10379166.jpeg' },
  { id: 8,  name: 'Madra',            image: 'https://images.pexels.com/photos/33643298/pexels-photo-33643298.jpeg' },
  { id: 9,  name: 'Babru',            image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&auto=format&fit=crop&q=60' },
  { id: 10, name: 'Banarasi Paan',    image: 'https://images.pexels.com/photos/1362916/pexels-photo-1362916.jpeg' },
  { id: 11, name: 'Petha',            image: 'https://images.pexels.com/photos/35254697/pexels-photo-35254697.jpeg' },
  { id: 12, name: 'Bedai Alu Sabzi',  image: 'https://images.pexels.com/photos/36651769/pexels-photo-36651769.jpeg' },
  { id: 13, name: 'Jalebi',           image: 'https://images.pexels.com/photos/36215924/pexels-photo-36215924.jpeg' },
  { id: 14, name: 'Butter Chicken',   image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=60' },
  { id: 15, name: 'Chole Bhature',    image: 'https://images.pexels.com/photos/36388454/pexels-photo-36388454.jpeg' },
  { id: 16, name: 'Aloo Tikki',       image: 'https://images.pexels.com/photos/10102480/pexels-photo-10102480.jpeg' },
  { id: 17, name: 'Pav Bhaji',        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=60' },
  { id: 18, name: 'Vada Pav',         image: 'https://images.pexels.com/photos/36926107/pexels-photo-36926107.jpeg' },
  { id: 19, name: 'Pani Puri',        image: 'https://images.pexels.com/photos/13063312/pexels-photo-13063312.jpeg' },
  { id: 20, name: 'Appam with Stew',  image: 'https://images.pexels.com/photos/10810716/pexels-photo-10810716.jpeg' },
  { id: 21, name: 'Karimeen',         image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=60' },
  { id: 22, name: 'Malabar Parotta',  image: 'https://images.pexels.com/photos/35071820/pexels-photo-35071820.jpeg' },
  { id: 23, name: 'Aloo Ke Gutke',    image: 'https://images.pexels.com/photos/36343375/pexels-photo-36343375.jpeg' },
  { id: 24, name: 'Kafuli',           image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=60' },
  { id: 25, name: 'Singori',          image: 'https://images.pexels.com/photos/36346842/pexels-photo-36346842.jpeg' },
  { id: 26, name: 'Veg Momos',        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=60' },
  { id: 27, name: 'Thukpa',           image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=60' },
  { id: 28, name: 'Rasgulla',         image: 'https://images.pexels.com/photos/8788869/pexels-photo-8788869.jpeg' },
]

async function updateDb() {
  console.log('Starting Supabase images update...')
  
  // Update destinations
  for (const dest of DESTINATIONS) {
    const { data, error } = await supabase
      .from('destinations')
      .update({ image: dest.image })
      .eq('name', dest.name)
      .select()
      
    if (error) {
      console.error(`Error updating destination ${dest.name}:`, error.message)
    } else if (data && data.length > 0) {
      console.log(`Successfully updated destination ${dest.name}`)
    } else {
      console.log(`Destination ${dest.name} not found in database (skipped)`)
    }
  }

  // Update foods
  for (const food of FOODS) {
    const { data, error } = await supabase
      .from('foods')
      .update({ image: food.image })
      .eq('name', food.name)
      .select()

    if (error) {
      console.error(`Error updating food ${food.name}:`, error.message)
    } else if (data && data.length > 0) {
      console.log(`Successfully updated food ${food.name}`)
    } else {
      console.log(`Food ${food.name} not found in database (skipped)`)
    }
  }

  console.log('Finished updating database!')
}

updateDb().catch(console.error)
