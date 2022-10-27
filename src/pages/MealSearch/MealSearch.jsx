import { useState } from "react"
import styles from './MealSearch.module.css'
import * as mealService from '../../services/mealService'
import MealSearchForm from "../../components/MealSearchForm/MealSearchForm"
import MealCard from "../../components/MealCard/MealCard"

const MealSearch = () => {
  const [meals, setMeals] = useState([])

  const handleMealSearch = async formData => {
    const mealResults = await mealService.search(formData)
    setMeals(mealResults)
  }
  
  return (
    <>
      <h2>Meals</h2>
      <MealSearchForm handleMealSearch={handleMealSearch}/>
      {meals.length ? 
        <ul>
          {meals.map(meal => 
            <li key={meal.recipe.uri}>
              <MealCard meal={meal} />
            </li> 
          )}
        </ul>
        :
        <>
          
        </>
      }
    </>
  )
}

export default MealSearch