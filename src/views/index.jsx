import React, { useEffect, useContext, useCallback, useState, useMemo } from 'react';
import delve from 'dlv';
import WeatherHOC from 'Containers/WeatherHOC';
import ThemeHOC from 'Containers/ThemeHOC';
import { WeatherContext, ACTION as WEATHER_ACTION } from 'Context/WeatherContext';
import Card from 'Components/Card/';
import Table from 'Components/Table/';
import * as Styled from 'Views/styled';
import { STATUS_CODE } from 'Fetches/constants';
import getForecastWeather from 'Fetches/getForecastWeather';
import { STATUS } from 'Context/constants';
import compose from 'src/utils/compose';
import 'Styles/main.scss';

/**
 * formatForecast Response
 *  parse response of unneeded data
 *
 * @param {*} data
 */
const formatForecastResponse = (data) => {
  /* Appends URL for weather icon provided by openweathermap */
  const formatWeather = (weather) => {
    return weather.map(({ icon, ...restProps }) => {
      return {
        icon: `http://openweathermap.org/img/w/${icon}.png`,
        ...restProps,
      };
    });
  };
  /* eslint-disable */
  const list =
    data.list &&
    data.list.map((listData) => {
      let description = listData.weather && listData.weather[0].description;

      return {
        date: delve(listData, 'dt_txt', ''),
        snow: delve(listData, 'snow', null),
        wind: delve(listData, 'wind', null),
        rain: delve(listData, 'rain', null),
        clouds: delve(listData, 'clouds', null),
        minTemp: delve(listData, 'main.temp_min', null),
        maxTemp: delve(listData, 'main.temp_max', null),
        weather: formatWeather(delve(listData, 'weather', [])),
        description,
      };
    });
  /* eslint-enable */

  return {
    ...data,
    list,
  };
};

/**
 * MainView
 *
 */
function MainView() {
  const { state, dispatch } = useContext(WeatherContext);
  const [cityName, setCityName] = useState('');
  const [cityTitle, setCityTitle] = useState('');

  const handleChangeEvent = useCallback((value) => setCityName(value), [setCityName]);

  const { data: stateData, error, status } = state;

  // Manually set city title; based on formatted repsonse from API
  useEffect(() => {
    const cityTitle = delve(stateData, 'city.name', null);

    setCityTitle(cityTitle);
  }, [stateData]);

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
              type: WEATHER_ACTION.SET_FORECAST_DATA,
              data: formatForecastResponse(forecastData),
            });
          }
        }
      }

      sendRequest();
    },
    [dispatch, cityName],
  );

  // TODO: on CLick date column will trigger sorting by date
  const columns = useMemo(() => {
    const dateData = [];
    const minTempData = [];
    const maxTempData = [];
    const descriptionData = [];

    /* Populate data arrays for each column */
    if (stateData) {
      const { list = [] } = stateData;
      /* eslint-disable-next-line */
      list.forEach(({ date, description, maxTemp, minTemp }) => {
        dateData.push(date);
        minTempData.push(minTemp);
        maxTempData.push(maxTemp);
        descriptionData.push(description);
      });
    }

    return {
      date: {
        colLabel: 'Date',
        data: dateData,
        // TODO: create styled component container for each column
        // colRenderer: (colLabel, cellData) => {
        //   return (

        //   );
        // },
        cellRenderer: ({ cellData, index }) => {
          return cellData;
        },
      },
      minTemp: {
        colLabel: 'Min. Temp',
        data: minTempData,
        // colRenderer: (props) => {},
        // cellRenderer: (props) => {},
      },
      maxTemp: {
        colLabel: 'Max Temp',
        data: maxTempData,
        // colRenderer: (props) => {},
        // cellRenderer: (props) => {},
      },
      description: {
        colLabel: 'Description',
        data: descriptionData,
        // colRenderer: (props) => {},
        cellRenderer: ({ cellData, index }) => {
          // Super unsafe use delve
          const weatherIcon = stateData.list[index].weather[0].icon;

          // TODO: properly format this.
          return (
            <div
              style={{
                display: 'flex',
                ['align-items']: 'center',
              }}
            >
              {cellData}

              <img src={weatherIcon} alt="icon" />
            </div>
          );
        },
      },
    };
  }, [stateData]);

  /* render spinner */
  const isLoading = status === STATUS.PENDING;
  const cellCount = useMemo(() => {
    return delve(stateData, 'cnt', null);
  }, [stateData]);

  return (
    <Styled.MainViewContainer>
      <Styled.HeaderContainer>
        <Styled.SearchbarContainer
          style={{
            border: '1px solid red',
          }}
        >
          <Styled.Searchbar
            id="city"
            data-automation-id="city"
            onChange={handleChangeEvent}
            onKeyPress={onGetForecast}
            placeholderText="Search for city..."
          />
          {isLoading ? <Styled.LoaderIcon /> : <Styled.SearchbarIcon />}
        </Styled.SearchbarContainer>

        <Styled.Header>
          <h3>Forecast</h3>
          <h3> 10 June - 15 June</h3>
          {/* eslint-disable-next-line */}
          <h4>City : {cityTitle}</h4>
        </Styled.Header>
      </Styled.HeaderContainer>

      <Styled.BodyContainer>
        <Card>
          <Table
            columns={columns}
            cellCount={cellCount}
            //  rowRenderer = {}
          />
        </Card>
      </Styled.BodyContainer>
    </Styled.MainViewContainer>
  );
}

MainView.defaultProps = {};
MainView.propTypes = {};

export default compose(WeatherHOC, ThemeHOC)(MainView);
