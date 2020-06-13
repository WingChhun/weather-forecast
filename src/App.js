import React from 'react';
import { ThemeProvider } from 'styled-components';
import logo from './logo.svg';
import './styles/main.scss';
import theme from './styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Weather Forecast default create react app</p>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
