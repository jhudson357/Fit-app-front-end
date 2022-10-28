import { useState } from "react"
import { useLocation } from "react-router-dom"
import styles from './EditExercise.module.css'

const EditExercise = (props) => {
  const { state } = useLocation()
  const[form, setForm] = useState(state)

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }
  
  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleUpdateExercise(form)
  }
  
  return (
    <main className={styles.container}>
      <form className={styles.container} onSubmit={handleSubmit} autoComplete="off">
        <h2>Create an Exercise</h2>
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="name-input">Exercise</label>
            <input
              required
              type="text"
              name="name"
              id="name-input"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
            />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}  htmlFor="reps-input">Reps</label>
          <input
            required
            type="number"
            name="reps"
            id="reps-input"
            value={form.reps}
            placeholder="Reps"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
        <label className={styles.label}  htmlFor="equipment-input">Equipment</label>
          <input
            required
            type="text"
            name="equipment"
            id="equipment-input"
            value={form.equipment}
            placeholder="Equipment"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}  htmlFor="muscle-input">Muscle</label>
          <select
            required
            name="muscle"
            id="muscle-input"
            value={form.muscle}
            onChange={handleChange}
            className={styles.select}
            >
            <option className={styles.option} value="upper back">Upper Back</option>
            <option value="lower back">Lower Back</option>
            <option value="chest">Chest</option>
            <option value="abs">Abs</option>
            <option value="arms">Arms</option>
            <option value="legs">Legs</option>
          </select>
        </div>
        <button className={styles.button}type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default EditExercise