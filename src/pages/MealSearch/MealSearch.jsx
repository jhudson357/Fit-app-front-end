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
    <main className={styles.container}>
      <div className={styles.form}>
        <MealSearchForm handleMealSearch={handleMealSearch}/>
      </div>
      {meals.length ? 
        <div>
          {meals.map(meal => 
            <div key={meal.recipe.uri}>
              <MealCard meal={meal} />
            </div>
          )}
        </div>
        :
        <>
        </>
      }
    </ main>
  )
}

export default MealSearch