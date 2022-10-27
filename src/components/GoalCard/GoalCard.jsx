import { useState } from "react"


const GoalCard = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({content: '', date: ''})


  const handleDelete = (e) => {
    e.preventDefault()
    props.handleDeleteGoal(props.id, props.goal._id)
  }

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    //this conditinal prevents allowing the form to PUT an empty object to the backend when isEditing state is changed, triggering a component re-render
    if (form.content) {
      props.handleUpdateGoal(props.goal._id, form)
      const idx = props.profile.goals.indexOf(props.goal)
      props.profile.goals[idx] = form
      const newGoals = props.profile.goals
      props.setProfile({...props.profile, goals: newGoals})
    }
  }


  return ( 
    <>
      <form onSubmit={handleUpdate}>
        {!isEditing ? 
          <>
            <h2>{props.goal.content} by {props.goal.date}</h2>
          </>

        : <>
          <textarea 
          name='content'
          value={form.content}
          placeholder={props.goal.content}
          onChange={handleChange}
        ></textarea>
        <input type="date" name='date' value={form.date} onChange={handleChange}/> 
        </>}

        {isEditing ?
        <button onClick={() => setIsEditing(false)} type='submit'>Save</button> 
        : <button onClick={() => setIsEditing(true)}>Edit</button>}
      </form>

      <form onSubmit={handleDelete}>
        <button type='submit'>Delete</button>
      </form>
    </>
  );
}

export default GoalCard;