import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'

const Profiles = ({user, exercises}) => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  return (
    <>
      <h1>ALL PROFILES</h1>
      <>
      
        <Link to={`/profiles/${user.profile}`} exercises={exercises}>
              <p key={user.profile}>{user.name}</p>
        </Link>
      </>
    </>
  )
}

export default Profiles