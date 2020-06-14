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

  font-size: 30px;

  height: 100vh;
  width: 100vw;
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
`;

export const SearchButton = styled.div`
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

export const SearchbarContainer = styled.div`
  display: flex;
  width: 300px;
  max-width: 350px;

  align-items: flex-end;
  margin-bottom: 15px;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: default;
  & span:not(:first-child) {
    display: inline-block;

    margin-left: 25px;
  }

  & p {
    font-weight: ${(props) => props.theme.weight.regular};
    font-size: 16px;
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

  justify-content: space-between;
  max-width: 150px;

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
`;

export const DateCol = styled.div`
  padding: 5px;
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
