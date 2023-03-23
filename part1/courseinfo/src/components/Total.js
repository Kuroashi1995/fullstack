function Total({ parts }) {
  let sum = 0;
  for (let part of parts) {
    sum += part.exercises;
  }
  return (
    <div>
      <p>
        Number of exercises &nbsp;
        {sum}
      </p>
    </div>
  );
}
export default Total;
