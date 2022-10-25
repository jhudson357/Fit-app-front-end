import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import * as exerciseService from '../../services/exerciseService'

const ExerciseDetails = () => {
  const { id } = useParams()
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    const fetchExercise = async () => {
      const exerciseData = await exerciseService.show(id)
      setExercise(exerciseData)
      console.log('EXERCISE DATA', exerciseData)
      console.log('ID', id)
      console.log('EXERCISE', exercise)
    }
    fetchExercise()
  }, [id])
  
  if (!exercise) return (<h2>Loading...</h2>)
  return (
    <>
      <h2>{exercise.name.toUpperCase()}</h2>
      <h3>{exercise.muscle}</h3>
      <p>{exercise.equipment}</p>
      <p>{exercise.reps}</p>
    </>
  )
}

export default ExerciseDetails