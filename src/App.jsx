import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'

import Navbar          from './components/Navbar'
import HomePage        from './pages/HomePage'
import ExplorePage     from './pages/ExplorePage'
import DestinationPage from './pages/DestinationPage'
import PlanTripPage    from './pages/PlanTripPage'
import ItineraryPage   from './pages/ItineraryPage'
import FoodPage        from './pages/FoodPage'
import ExpensePage     from './pages/ExpensePage'
import SavedTripsPage  from './pages/SavedTripsPage'
import ProfilePage     from './pages/ProfilePage'
import AuthPage        from './pages/AuthPage'

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/"                    element={<HomePage />} />
          <Route path="/explore"             element={<ExplorePage />} />
          <Route path="/destination/:name"   element={<DestinationPage />} />
          <Route path="/plan"                element={<PlanTripPage />} />
          <Route path="/itinerary"           element={<ItineraryPage />} />
          <Route path="/food"                element={<FoodPage />} />
          <Route path="/expense"             element={<ExpensePage />} />
          <Route path="/saved"               element={<SavedTripsPage />} />
          <Route path="/profile"             element={<ProfilePage />} />
          <Route path="/auth"                element={<AuthPage />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  )
}
