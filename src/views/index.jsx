import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';
import WeatherHOC from 'Containers/WeatherHOC';
import ThemeHOC from 'Containers/ThemeHOC';
import { WeatherContext } from 'Context/WeatherContext';
import InputField from 'Components/InputField/';
import compose from 'src/utils/compose';
import Search from 'Styles/assets/search.svg';
import logo from 'Assets/logo.svg';
import 'Styles/main.scss';

const MainViewContainer = styled.div`
  margin: 25px auto;
  text-align: center;
  display: flex;
  flex-direction: column;

  & h2 {
    font-size: 30px;
  }
`;

/**
 * MainView
 *
 */
function MainView() {
  console.group('MainView'); // DEBUG
  const { state, dispatch } = useContext(WeatherContext);

  /**
   * TODO: User has pressed enter, fire a fetch
   *
   * */
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' || event.keyCode === 0) {
      console.log('TODO: handleKeyPress');
    }
  }, []);

  console.groupEnd(); // DEBUG

  return (
    <MainViewContainer>
      <h2> Weather Forecast</h2>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Weather forecast</p>
      <img src={Search} alt="search icon" />

      <InputField onKeyPress={handleKeyPress} />
    </MainViewContainer>
  );
}

MainView.defaultProps = {};
MainView.propTypes = {};

export default compose(WeatherHOC, ThemeHOC)(MainView);
