import Part from "./Part";

function Content(props) {
  return (
    <div>
      <Part
        part={props.partsExercises.parts[0]}
        exercises={props.partsExercises.exercises[0]}
      />
      <Part
        part={props.partsExercises.parts[1]}
        exercises={props.partsExercises.exercises[1]}
      />
      <Part
        part={props.partsExercises.parts[2]}
        exercises={props.partsExercises.exercises[2]}
      />
    </div>
  );
}
export default Content;
