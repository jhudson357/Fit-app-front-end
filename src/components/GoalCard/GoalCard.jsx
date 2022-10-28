import { useState } from "react"
import styles from './GoalCard.module.css'

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
      <form onSubmit={handleUpdate} className={styles.container}>
        {!isEditing ? 
          <>
            {props.goal.date !== '' ?
              <>
                <h2>{props.goal.content}</h2>
                <h4>by {props.goal.date}</h4>
              </>
            :
              <h2>{props.goal.content}</h2>
            }
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

        <div className={styles.editButtons}>
        {isEditing ?
        <button onClick={() => setIsEditing(false)} type='submit'>Save</button> 
        : <button onClick={() => setIsEditing(true)}>Edit</button>}
        <button onClick={handleDelete}>Delete</button>

        </div>
      </form>
    </>
  );
}

export default GoalCard;