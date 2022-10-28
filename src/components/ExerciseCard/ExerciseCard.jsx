import { Link } from "react-router-dom"
import styles from './ExerciseCard.module.css'

const ExerciseCard = ({exercise}) => {
  return (
    <div>
      <Link to={`/exercises/${exercise._id}`}>
        <button className={styles.exerciseCard}>
          <h3>{exercise.name}</h3>
          <h4>{exercise.muscle}</h4>
        </button>
      </Link>
    </div>
  )
}

export default ExerciseCard