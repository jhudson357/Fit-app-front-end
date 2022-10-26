import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Days from "../../components/Days/Days";
import Goals from "../../components/Goals/Goals";

import * as profileService from '../../services/profileService'

const ProfileView = (props) => {
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
      <h3>I want to:</h3>
      <Days days={props.days}/>

      <h3>My goals:</h3>
      <Goals goals={profile.goals} profile={profile} setProfile={setProfile} id={id} />
    </>
  );
}

export default ProfileView;