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

  // const mealData = {
  //   label: mealDetails.recipe.label,
  //   description: mealDetails.recipe.description,
  //   calories: mealDetails.recipe.calories,
  //   image: mealDetails.recipe.image
  // }

  const handleAddMeal = async () => {
    console.log('meal details', mealDetails)
    await mealService.addMeal(mealDetails)
    // post request to meals database in the backend
  }
  
  console.log('meal deats outside of fxn', mealDetails)
  // console.log('MEALDETAILS RECIPE', mealDetails.recipe.label)

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
      
      {props.user ?  
        <>
          <button onClick={() => handleAddMeal()}>Save Meal to Profile</button>
          {/* <button >Save Meal to Profile</button> */}
        </>
        :
        <>TEST</>
      }

      </>
      :
      <h2>Loading</h2>
      }
    </>
  )
}

export default MealDetails