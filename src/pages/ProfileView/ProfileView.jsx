import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ExerciseAdder from "../../components/ExerciseAdder/ExerciseAdder"
import Goals from "../../components/Goals/Goals"
import ProfileExerciseCard from "../../components/ProfileExerciseCard/ProfileExerciseCard"
import ProfileMealCard from "../../components/ProfileMealCard/ProfileMealCard"

import * as profileService from '../../services/profileService'

const ProfileView = (props) => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  // const [form, setForm] = useState({
  //   id: '',
  // })
  const [mealForm, setMealForm] = useState({})
  const [exerciseNotInProfile, setExerciseNotInProfile] =useState([])

  // const handleChange = ({ target }) => {
  //   setForm({...form, [target.name]: target.value })
  // }
  const handleMealChange = ({ target }) => {
    setMealForm({...mealForm, [target.name]: target.value })
  }

  const handlePushExercise = async (pushData) => {
    try {
      await profileService.addExercise(profile._id, pushData)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
      setExerciseNotInProfile(profileData.exerciseNotInProfile)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteExercise = async (profileId, exerciseId) => {
    try {
      await profileService.deleteExercise(profileId, exerciseId)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
      setExerciseNotInProfile(profileData.exerciseNotInProfile)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePushMeal = async (pushMealData) => {
    try {
      await profileService.addMeal(profile._id, pushMealData)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
      // setExerciseNotInProfile(profileData.exerciseNotInProfile)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteMeal = async (profileId, mealId) => {
    try {
      await profileService.deleteMeal(profileId, mealId)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
      // setExerciseNotInProfile(profileData.exerciseNotInProfile)
    } catch (error) {
      console.log(error)
    }
  }

  // const handleSubmit = evt => {
  //   evt.preventDefault()
  //   handlePushExercise(form)
  // }
  const handleMealSubmit = evt => {
    evt.preventDefault()
    handlePushMeal(mealForm)
    setProfile({...profile, meals: [...profile.meals, mealForm]})
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
      setExerciseNotInProfile(profileData.exerciseNotInProfile)
    }
    fetchProfile()
  }, [id])

  return (  
    <>
      <h1>{profile.name}'s goals and weekly plan:</h1>
      <h3>My goals:</h3>
      <Goals goals={profile.goals} profile={profile} setProfile={setProfile} id={id} />
      <h3>Add Exercises</h3>
      <ExerciseAdder profile={profile} id={id} setProfile={setProfile} exercises={props.exercises} exerciseNotInProfile={exerciseNotInProfile} handlePushExercise={handlePushExercise} />
      {profile.exercises ?
        <>
          {profile.exercises.map((exercise, idx) => 
            <div key={idx}>
              <ProfileExerciseCard
                exercise={exercise}
                handleDeleteExercise={handleDeleteExercise}
                profileId={profile._id}
              /> 
            </div>
          )}
        </>
        :
        <>Loading exercises...</>
      }
      {props.meals ?
      <form onSubmit={handleMealSubmit} onChange={handleMealChange}>
        <select name="id"  onChange={handleMealChange}>
          {/* <option value='' selected disabled>Select Meal</option> */}
          {props.meals.map((meal) => 
            <option key={meal._id} value={meal._id}>{meal.label}</option>
          )}
        </select>
        <button type="submit">submit</button>
      </form>
      :
      <>loading meals</>
          }
      {profile.meals ?
        <>
          {profile.meals.map((meal, idx) => 
            <div key={idx}>
              {/* {meal.label} */}
              <ProfileMealCard 
                meal={meal}
                handleDeleteMeal={handleDeleteMeal}
                profileId={profile._id}
              />
            </div>
          )}
        </>
        :
        <>Loading meals...</>
      }

    </>
  );
}

export default ProfileView;