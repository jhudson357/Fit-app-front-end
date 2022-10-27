import { useState } from 'react'

const ExerciseAdder = (props) => {
  const [form, setForm] = useState({
    id: '',
  })

  const handleChange = ({ target }) => {
    setForm({...form, [target.name]: target.value })
  }

  const handleSubmit = evt => {
    console.log(form, 'AAAAAAHHHHHH')
    evt.preventDefault()
    props.handlePushExercise(form)
    props.setProfile({...props.profile, exercises: [...props.profile.exercises, form]})
  }

  return (  
    <>
      <h3>Today's Exercises</h3>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <select name="id" id=""  onChange={handleChange}>
          {props.exercises.map((exercise) => 
            <option key={exercise._id} value={exercise._id}>{exercise.name}</option>
          )}
        </select>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default ExerciseAdder;