const DayList = ({days}) => {
  return (  
    <>
    <h1>Day</h1>
      {days.map(day =>
        <>
          {day.name}
        </>
        )}
    </>
  );
}

export default DayList;