import { Link } from "react-router-dom"

const MealCard = (props) => {
  
  const mealLabel = props.meal.recipe.label.replaceAll(' ', '-').toLowerCase()

  const uriSplit = props.meal.recipe.uri.split('_')
  const mealId = uriSplit[uriSplit.length - 1]
  
  return (
    <Link to={`/meals/${mealId}`}  >
      <img src={props.meal.recipe.image} alt="" />
      {props.meal.recipe.label}
      <br />
      {mealId}
    </Link>
  )
}

export default MealCard