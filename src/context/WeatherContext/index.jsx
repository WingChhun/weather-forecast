import React, { useMemo, useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import { STATUS } from '../constants';

const WeatherContext = createContext();

const ACTION = Object.freeze({
  LOAD_FORECAST_DATA: 'LOAD_FORECAST_DATA',
  SET_FORECAST_DATA: 'SET_FORECAST_DATA',
  FAILED_FORECAST_DATA: 'FAILED_FORECAST_DATA',
});

function WeatherReducer(state, action) {
  switch (action.type) {
    case ACTION.LOAD_FORECAST_DATA:
      return {
        ...state,
        status: STATUS.PENDING,
      };
    case ACTION.SET_FORECAST_DATA:
      return {
        ...state,
        data: action.data,
        error: null,
        status: STATUS.LOADED,
      };
    case ACTION.FAILED_FORECAST_DATA:
      return {
        ...state,
        data: null,
        error: action.data,
        status: STATUS.FAILED,
      };
    default:
      return state;
  }
}

function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(WeatherReducer, {
    data: null,
    error: null,
    status: STATUS.UNINITIALIZED,
  });

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );
  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

WeatherProvider.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.func]).isRequired,
};

export { WeatherContext, WeatherProvider, ACTION };
