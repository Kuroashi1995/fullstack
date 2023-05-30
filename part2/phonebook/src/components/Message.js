const Message = ({ message }) => {
  const displayMessage =
    message.display === "error"
      ? `An error ocurred while ${message.method}, error message: ${message.message}`
      : message.message;
  return (
    <div className={message.display === "error" ? "error" : "message"}>
      <p>{displayMessage}</p>
    </div>
  );
};
export default Message;
