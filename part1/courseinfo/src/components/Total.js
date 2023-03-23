function Total({ parts }) {
  const total = parts.reduce((sum, currentValue) => {
    console.log(sum, currentValue);
    return sum + currentValue.exercises;
  }, 0);
  return (
    <div>
      <p>
        <b>Total of {total} exercises</b>
      </p>
    </div>
  );
}
export default Total;
