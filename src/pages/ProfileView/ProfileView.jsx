import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExerciseAdder from "../../components/ExerciseAdder/ExerciseAdder";
import Goals from "../../components/Goals/Goals";
import ProfileExerciseCard from "../../components/ProfileExerciseCard/ProfileExerciseCard";


import * as profileService from '../../services/profileService'

const ProfileView = (props) => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  // const [form, setForm] = useState({
  //   id: '',
  // })
  const [mealForm, setMealForm] = useState({
    id: ''
  })

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
      setProfile(profileData)
    } catch (err) {
      console.log(err)
    }
  }
  const handlePushMeal = async (pushMealData) => {
    try {
      await profileService.addMeal(profile._id, pushMealData)
    } catch (err) {
      console.log(err)
    }
  }



  const handleDeleteExercise = async (profileId, exerciseId) => {
    try {
      await profileService.deleteExercise(profileId, exerciseId)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData)
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
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData)
    }
    fetchProfile()
  }, [id])

  console.log('PROFILE ID', profile._id)
  // console.log('PROFILE EXERCISES', profile.exercises[0].name)
  return (  
    <>
      <h1>{profile.name}'s goals and weekly plan:</h1>
      <h3>My goals:</h3>
      <Goals goals={profile.goals} profile={profile} setProfile={setProfile} id={id} />
      <h3>Add Exercises</h3>
      {/* <form onSubmit={handleSubmit} onChange={handleChange}>
        <select name="id" id=""  onChange={handleChange}>
          {props.exercises.map((exercise) => 
            <option key={exercise._id} value={exercise._id}>{exercise.name}</option>
          )}
        </select>
        <button type="submit">submit</button>
      </form> */}
      <ExerciseAdder profile={profile} id={id} setProfile={setProfile} exercises={props.exercises} handlePushExercise={handlePushExercise} />
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
        <select name="id" id=""  onChange={handleMealChange}>
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
              {meal.label}
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