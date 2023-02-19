import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

function App() {
  const course = "Half Stack application development";
  const partsExercises = {
    parts: [
      "Fundamentals of React",
      "Using props to pass data",
      "State of a component",
    ],
    exercises: [10, 7, 14],
  };
  return (
    <div className="App">
      <Header course={course} />
      <Content partsExercises={partsExercises} />
      <Total partsExercises={partsExercises} />
    </div>
  );
}

export default App;
