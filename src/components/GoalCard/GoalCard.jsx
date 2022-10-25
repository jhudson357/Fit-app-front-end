const GoalCard = (props) => {
  return (  
    <>
      <p>I want to: {props.goal.content}</p>
      {props.goal.date ?
        <>
          <p>by {props.goal.date}</p>
        </>
      : <></>
      }
    </>
  );
}

export default GoalCard;