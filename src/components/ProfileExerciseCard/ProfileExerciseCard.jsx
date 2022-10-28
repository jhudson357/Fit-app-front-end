import { Link } from "react-router-dom"
import styles from './ProfileExerciseCard.module.css'

const ProfileExerciseCard = (props) => {

  return (
    <div className={styles.container}>
      <Link to={`/exercises/${props.exercise._id}`}>
        {props.exercise.name}
      </Link>
      <i class="fa-solid fa-trash" onClick={() => props.handleDeleteExercise(props.profileId, props.exercise._id)}></i>
    </div>
  )
}

export default ProfileExerciseCard