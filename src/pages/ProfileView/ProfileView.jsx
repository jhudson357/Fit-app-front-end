import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ExerciseAdder from "../../components/ExerciseAdder/ExerciseAdder"
import Goals from "../../components/Goals/Goals"
import ProfileExerciseCard from "../../components/ProfileExerciseCard/ProfileExerciseCard"
import ProfileMealCard from "../../components/ProfileMealCard/ProfileMealCard"
import styles from './ProfileView.module.css'

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

  const handleDeleteGoal = async (profileId, goalId) => {
    try {
      await profileService.deleteGoal(profileId, goalId)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddGoal = async (goalData) => {
    try {
      await profileService.createGoal(id, goalData)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData.profile)
    } catch (err) {
      console.log(err)
    }
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
        <div>
          <Goals goals={profile.goals} profile={profile} setProfile={setProfile} id={id} handleDeleteGoal={handleDeleteGoal} handleAddGoal={handleAddGoal}/>
        </div>

        <h3>Add Exercises</h3>
        <div className={styles.container}>
          <div className={styles.exerciseForm}>
            <ExerciseAdder profile={profile} id={id} setProfile={setProfile} exercises={props.exercises} exerciseNotInProfile={exerciseNotInProfile} handlePushExercise={handlePushExercise} />
          </div>

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
        </div>
        
        <h3>Add to Cookbook</h3>
        <div className={styles.container}>
          {profile.meals ?
          <form className={styles.exerciseForm} onSubmit={handleMealSubmit} onChange={handleMealChange}>
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
        </div>

    </>
  );
}

export default ProfileView;