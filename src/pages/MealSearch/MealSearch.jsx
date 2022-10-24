import { useState } from "react"
import styles from './MealSearch.module.css'
import * as mealService from '../../services/mealService'
import MealSearchForm from "../../components/MealSearchForm/MealSearchForm"
import MealCard from "../../components/MealCard/MealCard"

const MealSearch = () => {
  const [meals, setMeals] = useState([])

  // const getMealList = results => {
  //   setMeals(results)
  //   console.log('MEAL RESULTS!', meals)
  // }


  const handleMealSearch = async formData => {
    const mealResults = await mealService.search(formData)
    setMeals(mealResults)
    console.log('MEAL RESULTS', mealResults)
  }


  // const [formData, setFormData] = useState({
  //   mealQuery: ''
  // })

  // const [results, setResults] = useState([])

  // const handleChange = e => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  // }

  // const handleSubmit = async evt => {
  //   evt.preventDefault()
  //   try {
  //     const resultData = await mealService.search(formData)
  //     console.log(results)
  //     setResults(resultData)
  //   } catch (err) {
  //     console.log(err) 
  //   }
  // }
  
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
          Please search for a meal
        </>
      }
    </>
  )
}

export default MealSearch