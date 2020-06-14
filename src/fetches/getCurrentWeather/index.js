// import baseFetch from 'Utils/fetch';
import { BASE_WEATHER_URL, WEATHER_API_KEY } from '../constants';
/**
 * getCurrentWeather
 * @param {*} props
 */
function getCurrentWeather({ cityName = '', stateCode }) {
  return fetch(`http://${BASE_WEATHER_URL}?q=${cityName}&appid=${WEATHER_API_KEY}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => {
      console.warn(err);
      return err;
    });
}

export default getCurrentWeather;
