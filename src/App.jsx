// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import MealSearch from './pages/MealSearch/MealSearch'
import MealDetails from './pages/MealDetails/MealDetails'
import ExerciseList from './pages/ExerciseList/ExerciseList'
import ExerciseDetails from './pages/ExerciseDetails/ExerciseDetails'
import ProfileView from './pages/ProfileView/ProfileView'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:id"
          element={
            <ProtectedRoute user={user}>
              <ProfileView user/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meal-search"
          element={<MealSearch />}
        />
        <Route
          path="/meals/:mealId"
          element={<MealDetails />}
        />
        <Route
          path='/exercises'
          element= {<ExerciseList />}
        />
        <Route
          path='/exercises/:id'
          element= {
            <ExerciseDetails />
          }
        />
      </Routes>
    </>
  )
}

export default App
