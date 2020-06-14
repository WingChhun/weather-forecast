import React, { useContext, useEffect, useMemo } from 'react';
import { WeatherProvider } from 'Context/WeatherContext';
// TODO: the main purpose of this HOC is to provide children with WeatherContext as well as run some sort of local storage strategy logic?

/**
 * WeatherhOC
 *
 * @param {*} Component
 */
function WeatherHOC(Component) {
  const WrappedComponent = (props) => {
    return (
      <WeatherProvider>
        <Component {...props} />
      </WeatherProvider>
    );
  };

  WrappedComponent.defaultProps = {};
  WrappedComponent.propTypes = {};

  return WrappedComponent;
}

export default WeatherHOC;
