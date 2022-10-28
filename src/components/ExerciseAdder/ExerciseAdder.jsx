import { useState } from 'react'
import styles from './ExerciseAdder.module.css'

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
  }

  const isFormInvalid = () => {
    return !(form.id)
  }

  return (  
    <>
      <form className={styles.form} onSubmit={handleSubmit} onChange={handleChange}>
        <h3>Add Exercises</h3>
        <select name="id"  value={form.id} onChange={handleChange}>
        <option value='' defaultValue='' disabled>Select Exercise</option>
          {props.exerciseNotInProfile.map((exercise) => 
            <option key={exercise._id}value={exercise._id}>{exercise.name}</option>
          )}
        </select>
        <button className={styles.editButton}disabled={isFormInvalid()} type="submit">submit <i className="fa-solid fa-share"></i></button>
      </form>
    </>
  );
}

export default ExerciseAdder;