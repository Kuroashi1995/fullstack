import axios from "axios";
//constants
const baseUrl = "https://api.openweathermap.org/data/3.0/onecall";

const getCapitalWeather = async ({ lat, lng }) => {
  console.log(lat, lng);
  return await axios
    .get(baseUrl, {
      params: {
        lat: lat,
        lon: lng,
        appid: process.env.REACT_APP_ONE_CALL_API_KEY,
        units: "metric",
      },
    })
    .then((response) => response.data)
    .catch((error) => error.message);
};

const WeatherRepository = { getCapitalWeather: getCapitalWeather };
export default WeatherRepository;
