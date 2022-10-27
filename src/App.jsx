// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

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
import NewExercise from './pages/NewExercise/NewExercise'
import EditExercise from './pages/EditExercise/EditExercise'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as exerciseService from './services/exerciseService'
import * as mealsService from './services/mealService'

// styles
import './App.css'

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())
  const [exercises, setExercises] = useState([])
  const [meals, setMeals] = useState([])


  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddExercise = async (exerciseData) => {
    const newExercise = await exerciseService.create(exerciseData)
    setExercises([newExercise, ...exercises])
    navigate('/exercises')
  }

  const handleUpdateExercise = async (exerciseData) => {
    const updatedExercise = await exerciseService.update(exerciseData)
    const updatedExercisesData = exercises.map(exercise => {
      return exerciseData._id === exercise._id ? updatedExercise : exercise
    })
    setExercises(updatedExercisesData)
    navigate('/exercises')
  }

  const handleDeleteExercise = async (id) => {
    const deletedExercise = await exerciseService.deleteExercise(id)
    setExercises(exercises.filter(exercise => exercise._id !== deletedExercise._id))
    navigate('/exercises')
  }

  useEffect(() => {
    const fetchAllExercises = async () => {
      const exercisesData = await exerciseService.index()
      console.log('Exercise Data:', exercisesData)
      setExercises(exercisesData)
      console.log(exercises, 'EXERCISES')
    }
    fetchAllExercises()
  }, [])

  useEffect(() => {
    const fetchAllMeals = async () => {
      const mealsData = await mealsService.index()
      console.log('MEAL DATA', mealsData)
      setMeals(mealsData)
      console.log(meals, "MEALS")
    }
    fetchAllMeals()
  }, [])



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
              <Profiles user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:id"
          element={
            <ProtectedRoute user={user}>
              <ProfileView user={user} exercises={exercises} meals={meals}/>
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
          element={<MealDetails  user={user}/>}
        />
        <Route
          path='/exercises'
          element= {<ExerciseList exercises={exercises}/>}
        />
        <Route
          path='/exercises/:id'
          element= {
            <ExerciseDetails user={user} handleDeleteExercise={handleDeleteExercise}/>
          }
        />
        <Route 
          path='/exercises/new'
          element= {
            <ProtectedRoute user={user}>
              <NewExercise handleAddExercise={handleAddExercise}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='/exercises/:id/edit'
          element={
            <ProtectedRoute user={user}>
              <EditExercise handleUpdateExercise={handleUpdateExercise} />
            </ProtectedRoute>  
          }
        />
      </Routes>
    </>
  )
}

export default App
