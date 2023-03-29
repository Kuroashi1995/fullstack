const Error = ({ error }) => {
  return (
    <p className="error">
      An error ocurred while {error.method}, error message: {error.message}
    </p>
  );
};
export default Error;
