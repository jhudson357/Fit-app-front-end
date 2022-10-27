import { Link } from "react-router-dom"
import styles from './MealCard.module.css'

const MealCard = (props) => {
  

  const uriSplit = props.meal.recipe.uri.split('_')
  const mealId = uriSplit[uriSplit.length - 1]
  
  return (
    <Link to={`/meals/${mealId}`}  >
      <div className={styles.card}>
        <div className={styles.textcard}>
          <img className={styles.image} src={props.meal.recipe.image} alt="" />
          <span className={styles.label}>
            {props.meal.recipe.label}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default MealCard