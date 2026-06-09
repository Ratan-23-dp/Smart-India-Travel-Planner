# 🇮🇳 Smart India Travel Planner

A modern travel planning web application built with React.js + Vite.

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| React.js (Vite) | Frontend framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router DOM | Page routing |
| React Leaflet | Interactive maps |
| Chart.js | Expense charts |
| Axios | API requests |
| React Hot Toast | Notifications |
| html2pdf.js | PDF download |
| Supabase | Auth + Database |

## 📁 Folder Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.jsx
│   ├── WeatherCard.jsx
│   ├── MapView.jsx
│   ├── DestinationCard.jsx
│   ├── StarRating.jsx
│   └── LoadingSpinner.jsx
├── pages/             # Full page components
│   ├── HomePage.jsx
│   ├── ExplorePage.jsx
│   ├── DestinationPage.jsx
│   ├── PlanTripPage.jsx
│   ├── ItineraryPage.jsx
│   ├── FoodPage.jsx
│   ├── ExpensePage.jsx
│   ├── SavedTripsPage.jsx
│   ├── ProfilePage.jsx
│   └── AuthPage.jsx
├── services/          # API integrations
│   ├── weatherService.js
│   ├── attractionsService.js
│   ├── foodService.js
│   └── supabase.js
├── hooks/             # Custom React hooks
│   ├── useWeather.js
│   └── useSavedTrips.js
├── context/           # React Context
│   └── AuthContext.jsx
├── utils/             # Static data & helpers
│   └── data.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

## ⚙️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your API keys:
```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_OPENTRIPMAP_API_KEY=your_opentripmap_api_key
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 🔑 Getting API Keys

| Service | URL | Free Tier |
|---------|-----|-----------|
| Supabase | https://supabase.com | ✅ Free |
| OpenWeather | https://openweathermap.org/api | ✅ Free |
| OpenTripMap | https://opentripmap.io | ✅ Free |
| TheMealDB | https://www.themealdb.com/api.php | ✅ Free |

## 🗄️ Supabase Tables

Create these tables in your Supabase dashboard:

### trips
```sql
create table trips (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  destination text,
  days int,
  type text,
  budget int,
  travelers int,
  created_at timestamp default now()
);
```

### expenses
```sql
create table expenses (
  id uuid default gen_random_uuid() primary key,
  group_id uuid,
  user_id uuid references auth.users,
  desc text,
  amount int,
  paid_by text,
  category text,
  created_at timestamp default now()
);
```

## 📱 Features

- 🏠 **Home Page** — Hero, animated counters, popular destinations
- 🔍 **Explore** — Filter destinations by category
- 📍 **Destination Details** — Weather, map, attractions, food
- 🗺️ **Plan Trip** — Smart form with budget breakdown
- ✨ **Itinerary Generator** — Day-by-day trip plan with PDF export
- 🍽️ **Food Explorer** — Indian dishes, categories, ingredients
- 💸 **Expense Splitter** — Add members, split bills, settlement summary
- 💾 **Saved Trips** — View, search, delete saved trips
- 👤 **Profile** — User info, stats, settings
- 🔐 **Auth** — Supabase login/signup

## 👨‍💻 Built For

First-year college project — smart, professional, and viva-friendly!
# Smart-India-Travel-Planner
