import styles from './ProfileMealCard.module.css'

const ProfileMealCard = (props) => {
  return (
    <div className={styles.container}>
      {props.meal.label}
      <button className={styles.button} onClick={() => props.handleDeleteMeal(props.profileId, props.meal._id)}>delete <i className="fa-solid fa-trash"></i></button>
      
    </div>
  )
}

export default ProfileMealCard