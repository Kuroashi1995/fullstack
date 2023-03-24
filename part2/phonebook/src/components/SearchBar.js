import { useState } from "react";

const SearchBar = ({ manageSearch }) => {
  //States
  const [textValue, setTextValue] = useState("");

  //Functions
  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    setTextValue(newSearch);
    manageSearch(event.target.value);
  };

  //Component
  return (
    <div>
      <h3>Search in Contacts:</h3>
      <form>
        <input
          type="text"
          value={textValue}
          onChange={handleSearchChange}
        ></input>
      </form>
    </div>
  );
};
export default SearchBar;
