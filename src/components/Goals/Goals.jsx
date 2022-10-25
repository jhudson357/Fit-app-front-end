import GoalCard from "../../components/GoalCard/GoalCard";

const Goals = (props) => {
  if (!props.goals) return <h3>no goals yet</h3>
  return (  
    <>
      {props.goals.map(goal => {
        return <GoalCard goal={goal} />
      })}
    </>
  );
}

export default Goals;