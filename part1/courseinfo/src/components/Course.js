import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <div className="App">
      <Header name={courses.name} />
      <Content course={courses} />
      <Total parts={courses.parts} />
    </div>
  );
};
export default Course;
