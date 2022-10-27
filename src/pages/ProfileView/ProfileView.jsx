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

  const [mealForm, setMealForm] = useState({
    id: ''
  })
  const [exerciseNotInProfile, setExerciseNotInProfile] =useState([])
  const [mealNotInProfile, setMealeNotInProfile] =useState([])


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
      setMealeNotInProfile(profileData.mealNotInProfile)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteMeal = async (profileId, mealId) => {
    try {
      await profileService.deleteMeal(profileId, mealId)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
      setMealeNotInProfile(profileData.mealNotInProfile)
    } catch (error) {
      console.log(error)
    }
  }


  const handleMealSubmit = evt => {
    evt.preventDefault()
    handlePushMeal(mealForm)
    setMealForm({id: ''})
    setProfile({...profile, meals: [...profile.meals, mealForm]})
  }

  const isFormInvalid = () => {
    return !(mealForm.id)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
      setExerciseNotInProfile(profileData.exerciseNotInProfile)
      setMealeNotInProfile(profileData.mealNotInProfile)
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
      {profile.meals ?
      <form onSubmit={handleMealSubmit} onChange={handleMealChange}>
        <select name="id" value={mealForm.id} onChange={handleMealChange}>
          <option value='' defaultValue='' disabled>Select Meal</option>
          {mealNotInProfile.map((meal) => 
            <option key={meal._id} value={meal._id}>{meal.label}</option>
          )}
        </select>
        <button disabled={isFormInvalid()} type="submit">submit</button>
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