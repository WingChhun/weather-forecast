/* eslint-disable */
export const BASE_WEATHER_URL = 'api.openweathermap.org/data/2.5';
export const BASE_FORECAST_URL = `${BASE_WEATHER_URL}/forecast`;
export const BASE_CURRENT_URL = `${BASE_WEATHER_URL}/current`;

export const WEATHER_API_KEY = process.env.API_KEY || '43ea80f516171eff1f4b29556832949e';

export const STATUS_CODE = Object.freeze({
  SUCCESS: '200',
  BAD_REQUEST: '400',
  NOT_FOUND: '404',
});
/* eslint-enable */
