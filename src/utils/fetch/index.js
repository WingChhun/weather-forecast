import axios from 'axios';
import delve from 'dlv';

const baseFetch = axios.create();

const cache = new Map();

/**
 * Custom Get Method which will be added to the base Fetch (contains caching)
 * @param {function} axiosGet - Axios Get Method
 * @returns {function} - Overwritten Axios Method
 */
const get = (axiosGet) => (...args) => {
  // Cache
  if (args.length > 3 && typeof args[3] === 'boolean') {
    if (!cache.get(args[0]) || !args[3]) {
      const request = axiosGet(...args);
      cache.set(args[0], request);
      return request;
    }
    return cache.get(args[0]);
  }
  return axiosGet(...args);
};

/**
 * Update BaseFetch with default headers.
 * @param {object} config - Config Object
 */
const updateBaseFetch = (config) => {
  const baseURL = delve(config, 'endpoints.openweather', 'api.openweathermap.org/data/2.5');

  // TODO: update auth header if needed
  baseFetch.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  baseFetch.defaults.baseURL = baseURL;
};

baseFetch.get = get(baseFetch.get);

export { updateBaseFetch };
export default baseFetch;
