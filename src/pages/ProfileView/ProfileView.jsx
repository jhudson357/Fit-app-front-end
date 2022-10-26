import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Goals from "../../components/Goals/Goals";
import ProfileExerciseCard from "../../components/ProfileExerciseCard/ProfileExerciseCard";

import * as profileService from '../../services/profileService'

const ProfileView = (props) => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  const [form, setForm] = useState({
    id: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData)
    }
    fetchProfile()
  }, [profile.exercises])

  const handleChange = ({ target }) => {
    setForm({...form, [target.name]: target.value })
  }

  const handlePushExercise = async (pushData) => {
    try {
      await profileService.addExercise(profile._id, pushData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    handlePushExercise(form)
  }

  console.log('PROFILE', profile)
  // console.log('PROFILE EXERCISES', profile.exercises[0].name)
  return (  
    <>
      <h1>{profile.name}'s goals and weekly plan:</h1>
      {/* {profile.exercises.map((exercise) => 
        
      )} */}
      <h3>My goals:</h3>
      <Goals goals={profile.goals} profile={profile} setProfile={setProfile} id={id} />

      <h3>Add Exercises</h3>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <select name="id" id=""  onChange={handleChange}>
          {props.exercises.map((exercise) => 
            <option key={exercise._id} value={exercise._id}>{exercise.name}</option>
          )}
        </select>
        <button type="submit">submit</button>
      </form>
      {profile.exercises ?
        <>
          {profile.exercises.map((exercise, idx) => 
            <div key={idx}>
              <ProfileExerciseCard exercise={exercise}/> 
            </div>
          )}
        </>
        :
        <>Loading exercises...</>
      }

    </>
  );
}

export default ProfileView;