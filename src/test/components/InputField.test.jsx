/* eslint-disable */
import React from 'react';
import renderer from 'react-test-renderer';
import InputField from 'Components/InputField';
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
      <InputField {...mockProps} />
    </ThemeProvider>
  );
}

describe(`InputField component`, () => {
  const mockProps = {
    onChange: () => {},
  };

  it(`should render InputField`, () => {
    const InputOutput = renderer.create(getJSX(mockProps));
    expect(InputOutput.toJSON()).toMatchSnapshot();
  });
});

/* eslint-enable */
