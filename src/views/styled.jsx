import styled from 'styled-components';
import InputField from 'Components/InputField';
import SearchIcon from 'Components/Search';
import Loader from 'Components/Loader';

export const MainViewContainer = styled.div`
  margin: 25px auto;
  text-align: center;
  display: flex;
  padding: 50px;
  flex-direction: column;

  height: 100vh;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 15px;
    margin: 20px auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    padding: 8px;
    margin: 20px auto;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const BodyContainer = styled.div`
  width: 100%;

  margin: 0 auto;
`;

export const SearchbarIcon = styled(SearchIcon)`
  height: 28px;
  width: auto;
  transition: all 0.3 ease;

  &:hover {
    transition: all 0.3 ease;
    cursor: pointer;
  }
`;

export const LoaderIcon = styled(Loader)`
  height: 28px;
  width: auto;
`;

export const Searchbar = styled(InputField)`
  width: 300px;
  transition: all 0.3s ease;

  & input {
    border-radius: 15px;
  }

  & input:focus {
    width: 350px;
    transition: all 0.3s ease;
    border: 2px solid ${(props) => props.theme.colors.primary};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    width: 100%;

    & input:focus {
      width: 100%;
    }
  }
`;

export const SearchbarContainer = styled.div`
  display: flex;
  width: 300px;
  max-width: 350px;

  align-items: flex-end;
  margin-bottom: 15px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 275px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    width: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: default;
  & span {
    display: inline-block;

    & h5 {
      font-size: 22px;
    }
    & p {
      font-weight: ${(props) => props.theme.weight.regular};
      font-size: 16px;
    }

    &:not(:first-child) {
      margin-left: 25px;

      @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        margin-left: 15px;
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    flex-direction: column;
    text-align: center;

    & span {
      display: block;
      width: 100%;
      margin: 0;
      text-align: center;

      & h5 {
        font-size: 18px;
      }

      &:not(:first-child) {
        margin: 0;
      }
    }
  }
`;

export const Error = styled.span`
  color: ${(props) => props.theme.colors.error};
  font-weight: ${(props) => props.theme.weight.demi};
`;

/**
 * Components related to Table
 *
 */
export const DescriptionCell = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: 100%;

  justify-content: space-between;
  flex: 1 0 150px;

  & span:first-letter {
    text-transform: capitalize;
  }

  & span {
    width: auto;
  }

  & img {
    height: 50px;
    width: auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1 0 120px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex: 1 0 100px;
    font-size: 12px;

    & img {
      height: 32px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}) {
    flex: 1 0 50px;
    font-size: 10px;

    & span {
      white-space: normal;
    }
    & img {
      height: 24px;
    }
  }
`;

export const DateCol = styled.div`
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
    transition: 0.3s ease;
  }

  transition: all 0.3s ease;
`;

export const DateCell = styled.div`
  display: flex;
`;

export const TempCell = styled.div``;

export const TempCol = styled.div``;
