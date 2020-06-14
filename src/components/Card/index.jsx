import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
  color: 1px solid ${(props) => props.theme.colors.boxShadow};
  border-radius: 3px;
  box-shadow: 0 4px 8px 0 ${(props) => props.theme.colors.boxShadow};

  padding: 25px 15px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.white};
`;

const Card = ({ children, ...restProps }) => {
  return <StyledCard {...restProps}>{children}</StyledCard>;
};

Card.propTypes = {
  children: PropTypes.oneOf([PropTypes.func, PropTypes.node]).isRequired,
};

export default Card;
