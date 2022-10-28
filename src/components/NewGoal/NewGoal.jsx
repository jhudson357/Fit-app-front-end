import { useState } from "react";
import styles from './NewGoal.module.css'


const NewGoal = (props) => {
  const [form, setForm] = useState({content: '', date: ''})

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleAddGoal(form)
    setForm({content: '', date: ''})
  }


  return (  
    <form onSubmit={handleSubmit} className={styles.container}>
      <div>
        <textarea
          required
          type="text"
          name="content"
          id="text-input"
          value={form.content}
          placeholder="Add a Goal"
          onChange={handleChange}
        />
        <input type="date" name='date' value={form.date} onChange={handleChange}/>
      </div>

      <button type="submit" className={styles.editButton}>submit <i className="fa-solid fa-share"></i></button>
    </form>
  );
}

export default NewGoal;