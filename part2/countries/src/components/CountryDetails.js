import { useState } from "react";

const CountryDetails = ({ shoudlShow, country }) => {
  //States
  const [shown, setShown] = useState(false);
  if (shoudlShow) setShown(shoudlShow);

  //Functions
  const handleClick = () => {
    setShown(!shown);
  };
  return shown ? (
    <div>
      <h1>
        {country.name.common}{" "}
        <button onClick={handleClick}>{shown ? "Show Less" : "Show"}</button>
      </h1>
      <h3>Capital: {country.capital}</h3>
      <h4>Area: {country.area} sqmts</h4>
      <br></br>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map((languages) => (
          <li key={languages[0]}>{languages[1]}</li>
        ))}
      </ul>
      <br></br>
      <div>
        <img src={country.flags.png} alt={country.flags.alt}></img>
      </div>
      <button onClick={handleClick}>{shown ? "Show Less" : "Show"}</button>
      <br></br>
      <br></br>
    </div>
  ) : (
    <li>
      {country.name.common}{" "}
      <button onClick={handleClick}>{shown ? "Show Less" : "Show"}</button>
    </li>
  );
};
export default CountryDetails;
