// import baseFetch from 'Utils/fetch';
import { BASE_FORECAST_URL, WEATHER_API_KEY } from '../constants';
/**
 * getCurrentWeather
 * @param {*} props
 */
function getForecastWeather({ cityName = '' }) {
  return fetch(`http://${BASE_FORECAST_URL}?q=${cityName}&appid=${WEATHER_API_KEY}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => {
      console.warn(err);
      return err;
    });
}

export default getForecastWeather;
