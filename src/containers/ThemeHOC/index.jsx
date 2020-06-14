import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from 'Styles/';

/**
 * Theme HOC
 * @param {node|function} Component
 * @returns Component wrapped with ThemeProvider
 */
const ThemeHOC = (Component) => {
  const WrappedWithTheme = (props) => {
    return (
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };

  return WrappedWithTheme;
};

ThemeHOC.propTypes = {
  Component: PropTypes.oneOf([PropTypes.node, PropTypes.func]).isRequired,
};

export default ThemeHOC;
