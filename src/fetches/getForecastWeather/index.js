/* eslint-disable */
import { BASE_FORECAST_URL, WEATHER_API_KEY } from '../constants';
/**
 * getCurrentWeather
 * @param {*} props
 */
function getForecastWeather({ cityName = '' }) {
  return fetch(`https://${BASE_FORECAST_URL}?q=${cityName}&appid=${WEATHER_API_KEY}&units=imperial`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => {
      console.warn(err);
      return err;
    });
}

export default getForecastWeather;
/* eslint-enable */
