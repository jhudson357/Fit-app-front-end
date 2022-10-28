import styles from './ProfileMealCard.module.css'

const ProfileMealCard = (props) => {
  return (
    <div className={styles.container}>
      {props.meal.label}
      <button onClick={() => props.handleDeleteMeal(props.profileId, props.meal._id)} >
        DELETE
      </button>
    </div>
  )
}

export default ProfileMealCard