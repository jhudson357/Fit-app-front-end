import GoalCard from "../../components/GoalCard/GoalCard";
import NewGoal from "../../components/NewGoal/NewGoal";
import styles from './Goals.module.css'

import * as profileService from '../../services/profileService'

const Goals = (props) => {
  const handleUpdateGoal = async (goalId, goalData) => {
    try {
      await profileService.updateGoal(props.id, goalId, goalData)
    } catch (err) {
      console.log(err)
    }
  }

  if (!props.goals) return <h3>no goals yet</h3>
  return (  
    <>
      <div className={styles.container}>
        {props.goals.map((goal, idx) => (
          <div key={idx} >
            <GoalCard 
              goal={goal} 
              handleDeleteGoal={props.handleDeleteGoal} 
              handleUpdateGoal={handleUpdateGoal}
              id={props.id}
              profile={props.profile} 
              setProfile={props.setProfile}  
            />
          </div>
        ))}
        <NewGoal 
          profile={props.profile} 
          setProfile={props.setProfile} 
          id={props.id} 
          handleAddGoal={props.handleAddGoal} 
        />
      </div>
    </>
  );
}

export default Goals;