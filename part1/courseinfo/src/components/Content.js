import Part from "./Part";

function Content({ course }) {
  console.log(course);
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  );
}
export default Content;
