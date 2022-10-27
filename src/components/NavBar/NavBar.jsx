import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'
import Logo from '../../assets/FitLogo.svg'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className={styles.container}>
      <Link to={'/'}>
        <img src={Logo} alt="Fit logo" />
      </Link>

      {user ?
        <ul>
          {/* ICEBOX - All profiles: community feature */}
          {/* <li><Link to="/profiles">Profiles</Link></li> */}
          <li><Link to="/meal-search">Search Meals</Link></li>
          <li><Link to="/exercises">Exercises</Link></li>
          <li><Link to="/exercises/new">Create Exercise</Link></li>
          <li><Link to={`/profiles/${user.profile}`}>Profile</Link></li>
          <li><Link to="/change-password">Change Password</Link></li>
          <li><Link to="" onClick={handleLogout}>LOG OUT</Link></li>
        </ul>
      :
      <ul>
          <li><Link to="/meal-search">Search Meals</Link></li>
          <li><Link to="/exercises">Exercises</Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
