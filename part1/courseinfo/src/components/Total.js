function Total(props) {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.partsExercises[0].exercises +
          props.partsExercises[1].exercises +
          props.partsExercises[2].exercises}
      </p>
    </div>
  );
}
export default Total;
