function Total(props) {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.partsExercises.exercises[0] +
          props.partsExercises.exercises[1] +
          props.partsExercises.exercises[2]}
      </p>
    </div>
  );
}
export default Total;
