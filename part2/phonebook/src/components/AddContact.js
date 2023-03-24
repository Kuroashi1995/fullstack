import { useState } from "react";

const AddContact = ({ updateContacts }) => {
  //States
  const [textValue, setTextValue] = useState("");

  //Functions
  const handleSubmit = (event) => {
    event.preventDefault();
    updateContacts(event.target[0].value);
    setTextValue("");
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setTextValue(newValue);
  };

  //Component
  return (
    <div>
      <h2>Add Contact:</h2>
      <form onSubmit={handleSubmit}>
        name:{" "}
        <input type="text" value={textValue} onChange={handleChange}></input>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddContact;
