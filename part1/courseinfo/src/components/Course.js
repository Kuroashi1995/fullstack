import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <div className="App">
      <Header course={courses} />
      <Content course={courses} />
      <Total course={courses} />
    </div>
  );
};
export default Course;
