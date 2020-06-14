import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputField from './InputField';

const StyledSearchField = styled(InputField)`
  padding: 8px 4px;
  border: 2px solid orange;
`;

/**
 * InputField component
 *
 *
 */
const SearchField = (props) => {
  useEffect(() => {}, []);

  return (
    <div>
      <span>SearchField placeholder</span>
      <br />
      <StyledSearchField {...props} />
    </div>
  );
};

SearchField.defaultProps = {
  onChange: () => {},
  value: '',
};
SearchField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SearchField;
