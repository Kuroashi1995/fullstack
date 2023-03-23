function Total({ parts }) {
  let sum = 0;
  for (let part of parts) {
    sum += part.exercises;
  }
  return (
    <div>
      <p>
        <b>Total of {sum} exercises</b>
      </p>
    </div>
  );
}
export default Total;
