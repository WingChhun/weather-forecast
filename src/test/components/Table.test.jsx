/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import Table from 'Components/Table';
import { ThemeProvider } from 'styled-components';

/* move to mocks */
const mockTheme = {
  colors: {
    white: '#FFF',
    black: '#000',
    gray: '#D3D3D3',
    /* Palette generated from coolors.co */
    primary: '#2a9d8f',
    secondary: '#e9c46a',
    tertiary: '#264653',
    warning: '#f4a261',
    error: '#e76f51',
    boxShadow: '#d4d7dc',
    backgroundColor: '#F1F4F6',
  },
  breakpoints: {
    xxs: '375px',
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
  },
  weight: {
    thin: '200',
    regular: '400',
    medium: '500',
    demi: '600',
    bold: '700',
    heavy: '800',
  },
};

function getJSX(mockProps) {
  return (
    <ThemeProvider theme={mockTheme}>
      <Table {...mockProps} />
    </ThemeProvider>
  );
}

describe(`Table component`, () => {
  const mockProps = {
    columns: {
      date: {
        colLabel: 'Date',
        data: [
          '2020-06-15 00:00:00',
          '2020-06-15 03:00:00',
          '2020-06-15 06:00:00',
          '2020-06-15 09:00:00',
          '2020-06-15 12:00:00',
          '2020-06-15 15:00:00',
          '2020-06-15 18:00:00',
          '2020-06-15 21:00:00',
          '2020-06-16 00:00:00',
          '2020-06-16 03:00:00',
          '2020-06-16 06:00:00',
          '2020-06-16 09:00:00',
          '2020-06-16 12:00:00',
          '2020-06-16 15:00:00',
          '2020-06-16 18:00:00',
          '2020-06-16 21:00:00',
          '2020-06-17 00:00:00',
          '2020-06-17 03:00:00',
          '2020-06-17 06:00:00',
          '2020-06-17 09:00:00',
          '2020-06-17 12:00:00',
          '2020-06-17 15:00:00',
          '2020-06-17 18:00:00',
          '2020-06-17 21:00:00',
          '2020-06-18 00:00:00',
          '2020-06-18 03:00:00',
          '2020-06-18 06:00:00',
          '2020-06-18 09:00:00',
          '2020-06-18 12:00:00',
          '2020-06-18 15:00:00',
          '2020-06-18 18:00:00',
          '2020-06-18 21:00:00',
          '2020-06-19 00:00:00',
          '2020-06-19 03:00:00',
          '2020-06-19 06:00:00',
          '2020-06-19 09:00:00',
          '2020-06-19 12:00:00',
          '2020-06-19 15:00:00',
          '2020-06-19 18:00:00',
          '2020-06-19 21:00:00',
        ],
      },
      minTemp: {
        colLabel: 'Min. Temp',
        data: [
          '70.43°',
          '67.91°',
          '67.06°',
          '65.8°',
          '64.83°',
          '65.98°',
          '69.85°',
          '71.33°',
          '70.86°',
          '67.68°',
          '66.33°',
          '65.73°',
          '64.71°',
          '66.56°',
          '70.54°',
          '70.68°',
          '69.55°',
          '66.76°',
          '65.43°',
          '64.56°',
          '63.99°',
          '64.69°',
          '67.46°',
          '69.06°',
          '68.2°',
          '65.44°',
          '64.26°',
          '63.39°',
          '62.64°',
          '63.37°',
          '66.54°',
          '67.73°',
          '67.59°',
          '64.94°',
          '63.72°',
          '62.87°',
          '62.13°',
          '63.77°',
          '67.73°',
          '69.21°',
        ],
      },
      maxTemp: {
        colLabel: 'Max Temp',
        data: [
          '71.33°',
          '68.83°',
          '67.39°',
          '65.86°',
          '64.83°',
          '65.98°',
          '69.85°',
          '71.33°',
          '70.86°',
          '67.68°',
          '66.33°',
          '65.73°',
          '64.71°',
          '66.56°',
          '70.54°',
          '70.68°',
          '69.55°',
          '66.76°',
          '65.43°',
          '64.56°',
          '63.99°',
          '64.69°',
          '67.46°',
          '69.06°',
          '68.2°',
          '65.44°',
          '64.26°',
          '63.39°',
          '62.64°',
          '63.37°',
          '66.54°',
          '67.73°',
          '67.59°',
          '64.94°',
          '63.72°',
          '62.87°',
          '62.13°',
          '63.77°',
          '67.73°',
          '69.21°',
        ],
      },
      description: {
        colLabel: 'Description',
        data: [
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'scattered clouds',
          'overcast clouds',
          'broken clouds',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'few clouds',
          'broken clouds',
          'overcast clouds',
          'overcast clouds',
          'broken clouds',
          'broken clouds',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'few clouds',
          'broken clouds',
          'broken clouds',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'clear sky',
          'few clouds',
          'clear sky',
          'clear sky',
        ],
      },
    },
    cellCount: 40,
  };

  it(`should render Tan empty table able`, () => {
    const TableOutput = renderer.create(getJSX({}));
    expect(TableOutput.toJSON()).toMatchSnapshot();
  });

  it(`should render number of columns and cells`, () => {
    let elem = renderer.create(getJSX(mockProps));

    /* 41 table rows were rendered ( the first row being the  header*/
    const numberOfHeaderCells = elem.root.findAllByType('th').length;
    expect(numberOfHeaderCells).not.toBe(null);
    expect(numberOfHeaderCells).toBe(Object.keys(mockProps.columns).length);

    /* renders columns * rows cells*/
    const numberOfBodyCells = elem.root.findAllByType('td').length;

    expect(numberOfBodyCells).not.toBe(null);
    expect(numberOfBodyCells).toBe(numberOfHeaderCells * mockProps.cellCount);
  });

  it(`should render number of table rows based on props`, () => {
    let elem = renderer.create(getJSX(mockProps));

    /* 41 table rows were rendered ( the first row being the  header*/
    expect(elem.root.findAllByType('tr').length).not.toBe(null);
    expect(elem.root.findAllByType('tr').length).toBe(mockProps.cellCount + 1);
  });
});

/* eslint-enable */
