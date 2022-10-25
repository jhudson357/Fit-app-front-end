import { useState } from "react"

const NewExercise = (props) => {
  const [form, setForm] = useState({
    name: '',
    reps: '',
    muscle: 'chest',
    equipment: '',
  })

  const handleChange = ({ target }) => {
    setForm({...form, [target.name]: target.value })
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddExercise(form)
  }
  
  return (
    <main>
      <h2>Create an Exercise</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name-input">Exercise</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <label htmlFor="reps-input">Reps</label>
				<input
          required
          type="number"
          name="reps"
          id="reps-input"
          value={form.reps}
          placeholder="Reps"
          onChange={handleChange}
        />
        <label htmlFor="muscle-input">Muscle</label>
        <select
          required
          name="muscle"
          id="muscle-input"
          value={form.muscle}
          onChange={handleChange}
        >
          <option value="upper back">Upper Back</option>
          <option value="lower back">Lower Back</option>
          <option value="chest">Chest</option>
          <option value="abs">Abs</option>
          <option value="arms">Arms</option>
          <option value="legs">Legs</option>
        </select>
        <label htmlFor="equipment-input">Equipment</label>
        <input
          required
          type="text"
          name="equipment"
          id="equipment-input"
          value={form.equipment}
          placeholder="Equipment"
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default NewExercise;