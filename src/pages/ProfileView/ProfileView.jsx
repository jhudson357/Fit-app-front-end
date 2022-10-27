import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ExerciseAdder from "../../components/ExerciseAdder/ExerciseAdder";
import Goals from "../../components/Goals/Goals";
import ProfileExerciseCard from "../../components/ProfileExerciseCard/ProfileExerciseCard";


import * as profileService from '../../services/profileService'

const ProfileView = (props) => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})

  const handlePushExercise = async (pushData) => {
    try {
      await profileService.addExercise(profile._id, pushData)
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData)
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

    </>
  );
}

export default ProfileView;