import { Link } from "react-router-dom"

const ExerciseCard = ({exercise}) => {
  return (
    <Link to={`/exercises/${exercise._id}`}>
      <h3>{exercise.name}</h3>
      <h4>{exercise.muscle}</h4>
    </Link>
  )
}

export default ExerciseCard