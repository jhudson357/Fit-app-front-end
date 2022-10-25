import * as exerciseService from '../../services/exerciseService'
import { useState, useEffect } from 'react'

const ExerciseList = () => {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchAllExercises = async () => {
      const exerciseData = await exerciseService.index()
      console.log('Exercise Data:', exerciseData)
      setExercises(exerciseData)
      console.log(exercises, 'EXERCISES')
    }
    fetchAllExercises()
  }, [])

  return (
    <>
      <h2>Exercises</h2>
      {exercises.length ?
        <ul>
          {exercises.map(exercise =>
            <li key={exercise._id}>
              {exercise.name}
            </li>
          )}
        </ul>
        :
        <>
          Loading...
        </>
    }
      
    </>
  )
}

export default ExerciseList