const ProfileMealCard = (props) => {

  console.log('MEAL ID', props.meal._id)
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