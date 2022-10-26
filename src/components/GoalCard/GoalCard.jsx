const GoalCard = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleDeleteComment(props.id, props.goal._id)
    const newGoals = props.profile.goals.filter(goal => goal._id !== props.goal._id)
    props.setProfile({...props.profile, goals: newGoals})
  }

  return (  
    <>
      <h2>{props.goal.content}</h2>
      {props.goal.content && (
        <div>
      <form onSubmit={handleSubmit}>
        <button type='submit'>Delete</button>
      </form>
      <form>
      <button>Edit</button>
      </form>
      </div>
      )}
    </>
  );
}

export default GoalCard;