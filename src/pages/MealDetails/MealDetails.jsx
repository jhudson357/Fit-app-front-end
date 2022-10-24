import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as mealService from '../../services/mealService'

const MealDetails = (props) => {
  const [mealDetails, setMealDetails] = useState({})
  const {mealId} = useParams()

  useEffect(() => {
    console.log('useEffect running')
    console.log(mealId)
    const fetchMealDetails = async () => {
      console.log('useEffect still running')
      const mealData = await mealService.getMealDetails(mealId)
      console.log('MEAL DATA', mealData)
      setMealDetails(mealData)
    }
    fetchMealDetails()
  }, [mealId])


  return (
    <>
      <h2>meal details (remove once i figure out why it doesnt load the first time)</h2>
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
      </>
      :
      <h2>Loading</h2>
      }
    </>
  )
}

export default MealDetails