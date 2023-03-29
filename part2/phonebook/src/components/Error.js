const Error = ({ error }) => {
  return (
    <div className="error">
      <p>
        An error ocurred while {error.method}, error message: {error.message}
      </p>
    </div>
  );
};
export default Error;
