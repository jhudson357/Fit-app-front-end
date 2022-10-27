import { useState } from "react"
// import styles from './MealSearch.module.css'
import * as mealService from '../../services/mealService'

const MealSearchForm = (props) => {
  
  const [formData, setFormData] = useState({
    mealQuery: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleMealSearch(formData)
  }

  
  return (
    <>
      <form
      autoComplete="off"
      onSubmit={handleSubmit}
      >
        <div>
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
          <button>Search</button>
        </div>
      </form>
    </>
  )
}

export default MealSearchForm