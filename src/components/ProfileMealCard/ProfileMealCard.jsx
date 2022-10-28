import styles from './ProfileMealCard.module.css'

const ProfileMealCard = (props) => {
  return (
    <div className={styles.container}>
      {props.meal.label}
      <i className="fa-solid fa-trash" onClick={() => props.handleDeleteMeal(props.profileId, props.meal._id)}></i>
    </div>
  )
}

export default ProfileMealCard