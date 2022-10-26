import { Link } from "react-router-dom"

const ProfileExerciseCard = (props) => {
  
  return (
    <>
      <Link to={`/exercises/${props.exercise._id}`}>
        {props.exercise.name}
        <button>
          DELETE
        </button>
      </Link>
    </>
  )
}

export default ProfileExerciseCard