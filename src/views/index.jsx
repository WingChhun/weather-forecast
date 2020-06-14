/* eslint-disable */
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
  const [timeSpan, setTimeSpan] = useState(null);

  const handleChangeEvent = useCallback((value) => setCityName(value), [setCityName]);

  const { data: stateData, error, status } = state;

  // Manually set city title; based on formatted repsonse from API
  useEffect(() => {
    const cityTitle = delve(stateData, 'city.name', null);
    setCityTitle(cityTitle);

    /* get new timeSpan on state data change */

    const list = delve(stateData, 'list', []);

    if (list.length) {
      const { cnt: count } = stateData;
      const firstDate = new Date(list[0].date).toDateString();
      const lastDate = new Date(list[count - 1].date).toDateString();

      const span = `${firstDate} - ${lastDate}`;
      setTimeSpan(span);
    }

    /* reset window scroll position to top */
    window.scrollTo(0, 0);
  }, [stateData]);

  const getForecast = useCallback(async () => {
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
  }, [dispatch, getForecastWeather, cityName]);

  const onKeypressGetForecast = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        getForecast();
      }
    },
    [dispatch, cityName],
  );

  // TODO: sort
  /* Sort date on click: probably better if in local state*/
  const handleClickSortDate = useCallback(() => {
    const list = stateData.list && stateData.list;

    const sorted = list.sort((a, b) => {
      return b.date - a.date;
    });

    const updatedData = {
      ...stateData,
      list,
    };

    dispatch({
      type: WEATHER_ACTION.SET_FORECAST_DATA,
      data: updatedData,
    });
  }, [stateData]);

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
        minTempData.push(`${minTemp}°`);
        maxTempData.push(`${maxTemp}°`);
        descriptionData.push(description);
      });
    }

    return {
      date: {
        colLabel: 'Date',
        data: dateData,
        colRenderer: (colLabel) => {
          return <Styled.DateCol onClick={handleClickSortDate}>{colLabel}</Styled.DateCol>;
        },
        cellRenderer: ({ cellData, index }) => {
          const [date, time] = new Date(cellData).toLocaleString().split(',');

          return <Styled.DateCell>{cellData}</Styled.DateCell>;
        },
      },
      minTemp: {
        colLabel: 'Min. Temp',
        data: minTempData,
        colRenderer: (colLabel) => {
          return <Styled.TempCol onClick={handleClickSortDate}>{colLabel}</Styled.TempCol>;
        },
        cellRenderer: ({ cellData }) => {
          return <Styled.TempCell>{cellData}</Styled.TempCell>;
        },
      },
      maxTemp: {
        colLabel: 'Max Temp',
        data: maxTempData,
        colRenderer: (colLabel) => {
          return <Styled.TempCol onClick={handleClickSortDate}>{colLabel}</Styled.TempCol>;
        },
        cellRenderer: ({ cellData }) => {
          return <Styled.TempCell>{cellData}</Styled.TempCell>;
        },
      },
      description: {
        colLabel: 'Description',
        data: descriptionData,

        /* eslint-disable-next-line */
        cellRenderer: ({ cellData, index }) => {
          // Super unsafe use delve
          const weatherIcon = stateData.list && stateData.list[index].weather[0].icon;

          return (
            <Styled.DescriptionCell>
              <span>{cellData}</span>
              <img src={weatherIcon} alt="icon" />
            </Styled.DescriptionCell>
          );
        },
      },
    };
  }, [stateData]);

  console.log('columns:', columns);
  console.log('columns:', JSON.stringify(columns));

  /* render spinner */
  const isLoading = status === STATUS.PENDING;
  const showErrorSnag = status === STATUS.FAILED;
  const cellCount = useMemo(() => {
    return delve(stateData, 'cnt', null);
  }, [stateData]);

  return (
    <Styled.MainViewContainer>
      <Styled.HeaderContainer>
        <Styled.SearchbarContainer>
          {isLoading ? (
            <Styled.LoaderIcon />
          ) : (
            <Styled.SearchbarIcon id="search-icon" onClick={getForecast} />
          )}
          <Styled.Searchbar
            id="city"
            data-automation-id="city"
            onChange={handleChangeEvent}
            onKeyPress={onKeypressGetForecast}
            placeholder="Search for city..."
          />
        </Styled.SearchbarContainer>

        <Styled.Header>
          <span>
            <h5>Five Day Forecast</h5>
          </span>
          <span>
            <p>From: {timeSpan}</p>
          </span>
          <span>
            <p>City : {showErrorSnag ? <Styled.Error>{error}</Styled.Error> : cityTitle}</p>
          </span>
        </Styled.Header>
      </Styled.HeaderContainer>

      <Styled.BodyContainer>
        {isLoading && !stateData && <Styled.LoaderIcon />}
        {stateData && !isLoading && (
          <Card>
            <Table columns={columns} cellCount={cellCount} />
          </Card>
        )}
      </Styled.BodyContainer>
    </Styled.MainViewContainer>
  );
}

MainView.defaultProps = {};
MainView.propTypes = {};

export default compose(WeatherHOC, ThemeHOC)(MainView);
/* eslint-enable */
