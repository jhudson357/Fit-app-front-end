import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      {user ?
        <ul>
          <li>Welcome, {user.name}</li>
          {/* <li><Link to="/profiles">Profiles</Link></li> */}
          <li><Link to={`/profiles/${user.profile}`}>Profile</Link></li>
          <li><Link to="" onClick={handleLogout}>LOG OUT</Link></li>
          <li><Link to="/change-password">Change Password</Link></li>
          <li><Link to="/meal-search">Search Meals</Link></li>
          <li><Link to="/exercises">Exercises</Link></li>
          <li><Link to="/exercises/new">Create Exercise</Link></li>
        </ul>
      :
      <ul>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/meal-search">Search Meals</Link></li>
          <li><Link to="/exercises">Exercises</Link></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
