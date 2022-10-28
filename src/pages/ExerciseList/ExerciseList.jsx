import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import styles  from './ExerciseList.module.css'

const ExerciseList = (props) => {

  return (
    <div className={styles.content}>
      <div>
        <h1 className={styles.header}>Exercises</h1>
      </div>
      {props.exercises.length ?
        <div className={styles.exerciseCards}>
          {props.exercises.map(exercise =>
            <ExerciseCard key={exercise._id} exercise={exercise} />
          )}
        </div>
        :
        <>
          Loading...
        </>
    }
      
    </ div>
  )
}

export default ExerciseList