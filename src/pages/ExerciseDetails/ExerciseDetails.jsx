import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import * as exerciseService from '../../services/exerciseService'

const ExerciseDetails = (props) => {
  const { id } = useParams()
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    const fetchExercise = async () => {
      const exerciseData = await exerciseService.show(id)
      setExercise(exerciseData)
      console.log('EXERCISE DATA', exerciseData)
      console.log('ID', id)
      console.log('EXERCISE', exercise)
      console.log('USER', props.user.profile)
    }
    fetchExercise()
  }, [id])
  
  if (!exercise) return (<h2>Loading...</h2>)
  return (
    <>
      <h2>{exercise.name.toUpperCase()}</h2>
      <h3>Muscle: {exercise.muscle}</h3>
      <p>Equipment: {exercise.equipment}</p>
      <p>Reps: {exercise.reps}</p>
      <p>REMOVE - exercise.author: {exercise.author}</p>
      <p>REMOVE - Logged In User ID: {props.user.profile}</p>
      
      {/* MIGHT NEED TO BE exercise.author._id --> if so, need to popualte author details on the backend exercise controller fxn */}
      {exercise.author === props.user.profile && 
        <>
          <Link to={`/exercises/${id}/edit`} state={exercise}>Edit</Link>
          <button>Delete</button>
        </>
      }
    </>
  )
}

export default ExerciseDetails