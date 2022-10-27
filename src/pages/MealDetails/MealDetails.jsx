import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as mealService from '../../services/mealService'

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
    <>
      {mealDetails.recipe ?
      <>
      <img src={mealDetails.recipe.image} alt="" />
      <h2>{mealDetails.recipe.label}</h2>
      <h4>Cuisine Type: {mealDetails.recipe.cuisineType}</h4>
      <p>Calories: {Math.round(mealDetails.recipe.calories)}</p>
      <h3>Ingredients</h3>
      <ul>
        {mealDetails.recipe.ingredients.map((ingredient, idx) =>
          <li key={idx}>
            {`${ingredient.food} - Amount (grams): ${Math.round(ingredient.weight)}`}
          </li>
          )}

      </ul>
      <a href={mealDetails.recipe.url} target="_blank" rel="noopener noreferrer">Instructions</a>
      
      {props.user ?  
        <>
          <button onClick={() => handleAddMeal()}>Save Meal to Profile</button>
        </>
        :
        <></>
      }

      </>
      :
      <h2>Loading</h2>
      }
    </>
  )
}

export default MealDetails