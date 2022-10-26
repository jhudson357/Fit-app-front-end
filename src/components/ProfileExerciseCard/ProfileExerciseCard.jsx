import { Link } from "react-router-dom"

const ProfileExerciseCard = (props) => {

  return (
    <>
      <Link to={`/exercises/${props.exercise._id}`}>
        {props.exercise.name}
      </Link>
      <button onClick={() => props.handleDeleteExercise(props.profileId, props.exercise._id)} >
        DELETE
      </button>
    </>
  )
}

export default ProfileExerciseCard