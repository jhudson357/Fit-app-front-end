import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoalCard from "../../components/GoalCard/GoalCard";

import * as profileService from '../../services/profileService'

const ProfileView = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})

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
    </>
  );
}

export default ProfileView;