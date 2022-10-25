import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'

const ExerciseList = (props) => {

  return (
    <>
      <h2>Exercises</h2>
      {props.exercises.length ?
        <>
          {props.exercises.map(exercise =>
            <ExerciseCard key={exercise._id} exercise={exercise} />
          )}
        </>
        :
        <>
          Loading...
        </>
    }
      
    </>
  )
}

export default ExerciseList