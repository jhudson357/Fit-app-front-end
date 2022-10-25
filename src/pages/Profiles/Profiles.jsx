import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'

const Profiles = () => {
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
      {profiles.length ? 
        <>
          {profiles.map(profile =>
            <Link to={`/profiles/${profile._id}`}>
              <p key={profile._id}>{profile.name}</p>
            </Link>
          )}
        </>
      :
        <p>No profiles yet</p>
      }
    </>
  )
}

export default Profiles