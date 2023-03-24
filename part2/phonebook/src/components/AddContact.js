import { useState } from "react";

const AddContact = ({ updateContacts }) => {
  //States
  const [textValue, setTextValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  //Functions
  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      name: event.target[0].value,
      phone: event.target[1].value,
    };
    updateContacts(newContact);
    setTextValue("");
    setPhoneValue("");
  };

  const handleNameChange = (event) => {
    const newValue = event.target.value;
    setTextValue(newValue);
  };
  const handlePhoneChange = (event) => {
    const newValue = event.target.value;
    setPhoneValue(newValue);
  };

  //Component
  return (
    <div>
      <h2>Add Contact:</h2>
      <form onSubmit={handleSubmit}>
        Name:{" "}
        <input
          type="text"
          value={textValue}
          onChange={handleNameChange}
        ></input>
        Phone:{" "}
        <input
          type="text"
          value={phoneValue}
          onChange={handlePhoneChange}
        ></input>{" "}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddContact;
