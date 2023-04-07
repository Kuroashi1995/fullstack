import CountryDetails from "./CountryDetails";

const ShowCountries = ({ filteredCountries }) => {
  if (filteredCountries.length !== 0) {
    console.log(
      "ShowCountriesComponent > filteredCountries:",
      Object.entries(filteredCountries[0].languages)
    );
  }
  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (filteredCountries.length <= 10 && filteredCountries.length !== 1) {
    return (
      <div>
        <ul>
          {filteredCountries.map((country) => (
            <CountryDetails key={country.name.common} country={country} />
          ))}
        </ul>
      </div>
    );
  } else {
    return <CountryDetails country={filteredCountries[0]} shoudlShow={true} />;
  }
};
export default ShowCountries;
