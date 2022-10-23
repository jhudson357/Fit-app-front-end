import { useState } from "react"
import styles from './MealSearch.module.css'

const MealSearch = () => {
  
  const [formData, setFormData] = useState({
    mealQuery: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      // api call
    } catch (err) {
      console.log(err) 
    }
  }
  
  return (
    <>
      <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
      >
        <div className={styles.inputContainer}>
          <input
            type="text"
            autoComplete="off"
            placeholder="Search for a meal"
            id="meal-query"
            value={formData.mealQuery}
            name="mealQuery"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className={styles.button}>Search</button>
        </div>
      </form>
    </>
  )
}

export default MealSearch