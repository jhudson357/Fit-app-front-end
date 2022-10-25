import * as exerciseService from '../../services/exerciseService'
import { useState, useEffect } from 'react'
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'

const ExerciseList = () => {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchAllExercises = async () => {
      const exercisesData = await exerciseService.index()
      console.log('Exercise Data:', exercisesData)
      setExercises(exercisesData)
      console.log(exercises, 'EXERCISES')
    }
    fetchAllExercises()
  }, [])

  return (
    <>
      <h2>Exercises</h2>
      {exercises.length ?
        <>
          {exercises.map(exercise =>
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