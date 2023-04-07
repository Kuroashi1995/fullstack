import axios from "axios";

const getCountries = async () => {
  return await axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.message);
};
const CountriesRepository = { getCountries: getCountries };
export default CountriesRepository;
