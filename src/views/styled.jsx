import React from 'react';
import styled from 'styled-components';
import InputField from 'Components/InputField';
import SearchIcon from 'Components/Search';
import Loader from 'Components/Loader';

export const MainViewContainer = styled.div`
  margin: 25px auto;
  text-align: center;
  display: flex;

  flex-direction: column;

  & h2 {
    font-size: 30px;
  }
`;

export const HeaderContainer = styled.div`
  border: 1px solid red;
  width: 100%;
  flex-basis: 25%;

  display: flex;
  flex-direction: column;
`;

export const BodyContainer = styled.div`
  border: 1px solid orange;
  width: 100%;
  flex-basis: 75%;
`;

export const SearchbarIcon = styled(SearchIcon)`
  height: 28px;
  width: auto;
`;

export const LoaderIcon = styled(Loader)`
  height: 28px;
  width: auto;
`;

export const Searchbar = styled(InputField)``;

export const SearchButton = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

export const SearchbarContainer = styled.div`
  position: relative;

  border: 1px solid red;
  display: flex;
  width: 300px;

  align-items: flex-end;
`;

export const Header = styled.div`
  border: 1px solid yellow;
  display: flex;
  width: 100%;

  & h2 {
  }

  & h3 {
  }
`;

/**
 * Components related to Table
 *
 */
