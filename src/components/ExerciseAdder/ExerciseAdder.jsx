import { useState } from 'react'

const ExerciseAdder = (props) => {
  const [form, setForm] = useState(
    {id: ''}
  )


  const handleChange = ({ target }) => {
    setForm({...form, [target.name]: target.value })
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handlePushExercise(form)
    setForm({id: ''})
    props.setProfile({...props.profile, exercises: [...props.exercises, form]})
  }

  const isFormInvalid = () => {
    return !(form.id)
  }

  return (  
    <>
      <h3>Today's Exercises</h3>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <select name="id"  value={form.id} onChange={handleChange}>
        <option value='' defaultValue='' disabled>Select Exercise</option>
          {props.exerciseNotInProfile.map((exercise) => 
            <option key={exercise._id}value={exercise._id}>{exercise.name}</option>
          )}
        </select>
        <button disabled={isFormInvalid()} type="submit">submit</button>
      </form>
    </>
  );
}

export default ExerciseAdder;