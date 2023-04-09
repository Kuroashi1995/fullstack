import { useEffect, useState } from "react";
import WeatherRepository from "../services/weather";

const CountryDetails = ({ shouldShow, country }) => {
  //States
  const [shown, setShown] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(null);
  if (shouldShow === true && shown !== true) {
    console.log("CountryDetails > if > shouldShow:", shouldShow);
    setShown(shouldShow);
  }

  //Functions
  const handleClick = () => {
    setShown(!shown);
  };

  //Fetching info

  useEffect(() => {
    if (shown) {
      WeatherRepository.getCapitalWeather({
        lat: country.latlng[0],
        lng: country.latlng[1],
      }).then((response) => {
        console.log(response);
        setWeatherInfo(response);
      });
    }
  }, [country.latlng, shown]);

  //Component
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
      {weatherInfo !== null ? (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature: {weatherInfo.current.temp} Celsius</p>
          <img
            src={
              "http://openweathermap.org/img/wn/" +
              weatherInfo.current.weather[0].icon +
              "@2x.png"
            }
            alt={weatherInfo.current.weather[0].description}
          ></img>
          <p>wind {weatherInfo.current.wind_speed} m/s</p>
        </div>
      ) : (
        <div>false</div>
      )}
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
