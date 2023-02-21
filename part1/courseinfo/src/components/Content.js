import Part from "./Part";

function Content(props) {
  return (
    <div>
      <Part
        part={props.partsExercises[0].name}
        exercises={props.partsExercises[0].exercises}
      />
      <Part
        part={props.partsExercises[1].name}
        exercises={props.partsExercises[1].exercises}
      />
      <Part
        part={props.partsExercises[2].name}
        exercises={props.partsExercises[2].exercises}
      />
    </div>
  );
}
export default Content;
