import { useState } from "react";
import { useEffect } from "react";
import CountriesRepository from "./services/countries";
import SearchBar from "./components/SearchBar";
import ShowCountries from "./components/ShowCountries";

function App() {
  //States
  const [countries, setCountries] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  //Effect
  useEffect(() => {
    CountriesRepository.getCountries().then((response) => {
      return setCountries(response);
    });
  }, []);

  //Functions
  const handleChange = ({ searchInput }) => {
    const newfilteredCountries = countries.filter((element) => {
      return element.name.common
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      //mdn string.contains;
    });
    setFilteredCountries(newfilteredCountries);
    setSearchText(searchInput);
  };

  //Component
  return (
    <div className="App">
      <SearchBar searchText={searchText} handleOnChange={handleChange} />
      <ShowCountries filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
