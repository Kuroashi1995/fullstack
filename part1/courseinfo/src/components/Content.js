function Content(props) {
  return (
    <div>
      <p>
        {props.partsExercises.parts[0]} {props.partsExercises.exercises[0]}
      </p>
      <p>
        {props.partsExercises.parts[1]} {props.partsExercises.exercises[1]}
      </p>
      <p>
        {props.partsExercises.parts[2]} {props.partsExercises.exercises[2]}
      </p>
    </div>
  );
}
export default Content;
