import GoalCard from "../../components/GoalCard/GoalCard";
import NewGoal from "../../components/NewGoal/NewGoal";

import * as profileService from '../../services/profileService'

const Goals = (props) => {
  const handleAddGoal = async (goalData) => {
    try {
      await profileService.createGoal(props.id, goalData)
    } catch (err) {
      console.log(err)
    }
  }

  if (!props.goals) return <h3>no goals yet</h3>
  return (  
    <>
      {props.goals.map((goal, idx) => (
        <div key={idx}>
          <GoalCard  goal={goal} />
        </div>
      ))}
      <NewGoal profile={props.profile} setProfile={props.setProfile} id={props.id} handleAddGoal={handleAddGoal}/>
    </>
  );
}

export default Goals;