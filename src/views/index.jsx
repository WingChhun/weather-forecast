import React, { useContext, useCallback, useState } from 'react';
import styled from 'styled-components';
import WeatherHOC from 'Containers/WeatherHOC';
import ThemeHOC from 'Containers/ThemeHOC';
import { WeatherContext, ACTION as WEATHER_ACTION } from 'Context/WeatherContext';
import InputField from 'Components/InputField/';
import compose from 'src/utils/compose';
import logo from 'Assets/logo.svg';
import SearchSrc from 'Assets/search.svg';
import { STATUS_CODE } from 'Fetches/constants';
import getForecastWeather from 'Fetches/getForecastWeather';
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

const SearchIcon = (props) => <img src={SearchSrc} alt="search icon" {...props} />;

const StyledSearchIcon = styled(SearchIcon)`
  border: 1px solid red;
`;

const StyledInputField = styled(InputField)``;

const SearchButton = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
`;
/**
 * MainView
 *
 */
function MainView() {
  const { dispatch } = useContext(WeatherContext);
  const [cityName, setCityName] = useState('');

  const handleChangeEvent = useCallback((value) => setCityName(value), [setCityName]);

  const onGetForecast = useCallback(
    (event) => {
      async function sendRequest() {
        if (event.key === 'Enter') {
          /* Start Loader */
          dispatch({
            type: WEATHER_ACTION.LOAD_FORECAST_DATA,
          });

          const forecastData = await getForecastWeather({
            cityName,
          });

          /* Bad Request */
          if (
            forecastData.cod === STATUS_CODE.BAD_REQUEST ||
            forecastData.cod === STATUS_CODE.NOT_FOUND
          ) {
            dispatch({
              type: WEATHER_ACTION.FAILED_FORECAST_DATA,
              data: forecastData.message || 'Bad request',
            });
          }

          /* Successful Request */
          if (forecastData.cod === STATUS_CODE.SUCCESS) {
            dispatch({
              type: WEATHER_ACTION.SET_WEATHER_DATA,
              data: forecastData,
            });
          }
        }
      }

      sendRequest();
    },
    [dispatch, cityName],
  );

  console.groupEnd(); // DEBUG

  return (
    <MainViewContainer>
      <h2> Weather Forecast</h2>
      <img src={logo} className="App-logo" alt="logo" />

      <div>
        <StyledSearchIcon />
        <StyledInputField
          id="city"
          data-automation-id="city"
          onChange={handleChangeEvent}
          onKeyPress={onGetForecast}
          labelText="City"
        />
        <SearchButton>Search</SearchButton>
      </div>
    </MainViewContainer>
  );
}

MainView.defaultProps = {};
MainView.propTypes = {};

export default compose(WeatherHOC, ThemeHOC)(MainView);
