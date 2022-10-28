import { Link } from "react-router-dom"
import styles from './ProfileExerciseCard.module.css'

const ProfileExerciseCard = (props) => {

  return (
    <div className={styles.container}>
      <Link to={`/exercises/${props.exercise._id}`}>
        {props.exercise.name}
      </Link>
      <button onClick={() => props.handleDeleteExercise(props.profileId, props.exercise._id)} >
        DELETE
      </button>
    </div>
  )
}

export default ProfileExerciseCard