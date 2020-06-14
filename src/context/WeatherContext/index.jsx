import React, { useMemo, useReducer, createContext } from 'react';
import { STATUS } from '../constants';

const WeatherContext = createContext();

const ACTION = Object.freeze({
  SET_WEATHER_DATA: 'SET_WEATHER_DATA',
});

function WeatherReducer(state, action) {
  switch (action.type) {
    case ACTION.SET_WEATHER_DATA:
      return {
        ...state,
        // TODO: make some kind of utility
        data: action.data,
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

export { WeatherContext, WeatherProvider };
