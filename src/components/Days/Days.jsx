import DayCard from "../../components/DayCard/DayCard";

const Days = (props) => {
  if (!props.days) return <h3>no days yet</h3>
  return (  
    <>
      {/* {props.days.map(day => {
        return <DayCard key={day._id} days={day} />
      })} */}
    </>
  );
}

export default Days;