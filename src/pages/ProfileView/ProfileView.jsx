import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewGoal from "../../components/NewGoal/NewGoal";
import Goals from "../../components/Goals/Goals";

import * as profileService from '../../services/profileService'

const ProfileView = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})

  const handleAddGoal = async (goalData) => {
    const newGoal = await profileService.createGoal(id, goalData)
    setProfile({...profile, goals: [...profile.goals, newGoal]})
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await profileService.getOneProfile(id)
      setProfile(profileData)
    }
    fetchProfile()
  }, [id])

  return (  
    <>
      <h1>{profile.name}'s goals and weekly plan:</h1>
      <h3>Goals:</h3>
      <Goals goals={profile.goals} />
      <NewGoal handleAddGoal={handleAddGoal} />
    </>
  );
}

export default ProfileView;