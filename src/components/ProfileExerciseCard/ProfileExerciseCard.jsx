import { Link } from "react-router-dom"
import styles from './ProfileExerciseCard.module.css'

const ProfileExerciseCard = (props) => {

  return (
    <div className={styles.container}>
      <Link to={`/exercises/${props.exercise._id}`}>
        {props.exercise.name}
      </Link>
      <button className={styles.button} onClick={() => props.handleDeleteExercise(props.profileId, props.exercise._id)}>delete <i className="fa-solid fa-trash"></i></button>
    </div>
  )
}

export default ProfileExerciseCard