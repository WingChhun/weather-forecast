import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'Styles/';
import logo from '../logo.svg';
import 'Styles/main.scss';

function MainView() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Weather forecast</p>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default MainView;
