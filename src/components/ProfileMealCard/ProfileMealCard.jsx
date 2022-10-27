const ProfileMealCard = (props) => {
  return (
    <>
      {props.meal.label}
      <button onClick={() => props.handleDeleteMeal(props.profileId, props.meal._id)} >
        DELETE
      </button>
    </>
  )
}

export default ProfileMealCard