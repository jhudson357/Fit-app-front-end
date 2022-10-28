import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as mealService from '../../services/mealService'
import styles from './MealDetails.module.css' 

const MealDetails = (props) => {
  const [mealDetails, setMealDetails] = useState({
    // label: '',
    // description: '',
    // calories: 0,
    // image: ''
  })
  const [meals, setMeals] =useState({})
  const {mealId} = useParams()

  useEffect(() => {
    const fetchMealDetails = async () => {
      const mealData = await mealService.getMealDetails(mealId)
      setMealDetails(mealData)
    }
    fetchMealDetails()
  }, [mealId])

  const handleAddMeal = async () => {
    const mealData =await mealService.addMeal(mealDetails)
    setMeals(mealData)
  }

  return (
    <main>
      {mealDetails.recipe ?
        <div className={styles.allContent}>
          <div className={styles.detailsCard}>
            <div className={styles.image}>
              <img className={styles.mealImg} src={mealDetails.recipe.image} alt="" />
            </div>
            <div className={styles.content}>
              <div className={styles.label}>
                <h1>{mealDetails.recipe.label}</h1>
              </div>
              <div className={styles.cuisineCalories}>
                <div>
                  <p>Cuisine: {mealDetails.recipe.cuisineType}</p>
                </div>
                <div>
                  <p>{Math.round(mealDetails.recipe.calories)} calories</p>
                </div>
              </div>
              <div className={styles.ingredientHeader}>
                <h3>Ingredients</h3>
              </div>
              {/* <div className={styles.ingredients}>
                <ul>
                  {mealDetails.recipe.ingredients.map((ingredient, idx) =>
                    <li key={idx}>
                      {`${ingredient.food} (${Math.round(ingredient.quantity)} ${ingredient.measure})`}
                    </li>
                    )}
                </ul>
              </div> */}
              <div className={styles.ingredients}>
                <ul>
                  {mealDetails.recipe.ingredientLines.map((ingredient, idx) =>
                    <li key={idx}>
                      {ingredient}
                    </li>
                    )}
                </ul>
              </div>
                <a href={mealDetails.recipe.url} target="_blank" rel="noopener noreferrer">
                  <button>
                    Instructions
                  </button>
                </a>
            </div>
          </div>
          
          {props.user ?  
            <>
              <button className={styles.saveMealBtn} onClick={() => handleAddMeal()}>Save Meal</button>
            </>
            :
            <></>
          }
        </div>
      :
      <h2>Loading</h2>
      }
    </ main>
  )
}

export default MealDetails