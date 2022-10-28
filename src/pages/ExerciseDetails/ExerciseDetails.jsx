import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import styles from './ExerciseDetails.module.css'

import * as exerciseService from '../../services/exerciseService'

const ExerciseDetails = (props) => {
  const { id } = useParams()
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    const fetchExercise = async () => {
      const exerciseData = await exerciseService.show(id)
      setExercise(exerciseData)
    }
    fetchExercise()
  }, [id])
  
  if (!exercise) return (<h2>Loading...</h2>)
  return (
    <div className={styles.allContent}>
      <div className={styles.card}>
        <h1>{exercise.name.toUpperCase()}</h1>
        <h3>Muscle: {exercise.muscle}</h3>
        <p>Equipment: {exercise.equipment}</p>
        <p>Reps: {exercise.reps}</p>

        {exercise.author === props.user?.profile && 
          <div className={styles.editDeleteBtns}>
            <Link to={`/exercises/${id}/edit`} state={exercise} className={styles.editBtn}>
              <button>
                Edit
              </button>
            </Link>
            <button onClick={() => props.handleDeleteExercise(id)} className={styles.delBtn}>Delete</button>
          </div>
        }
      </div>
      <div className={styles.outsideBtns}>
        <Link to={'/exercises'}>
          <button className={styles.allBtn}>
            All Exercises
          </button>
        </Link>
        {props.user ?
          <>
            <Link to={`/profiles/${props.user.profile}`}>
              <button className={styles.profBtn}>
                Go to Profile
              </button>
            </Link>
          </>
          :
          <>
          </>
        }
      </div>
    </div>
  )
}

export default ExerciseDetails