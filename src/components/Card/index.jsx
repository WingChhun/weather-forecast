import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.div`
  color: 1px solid #d4d7dc;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 #d4d7dc;

  padding: 15px 10px;

  background-color: ${(props) => props.theme.colors.white};
`;

const Card = ({ children, ...restProps }) => {
  return <StyledCard {...restProps}>{children}</StyledCard>;
};

Card.propTypes = {
  children: PropTypes.oneOf([PropTypes.func, PropTypes.node]).isRequired,
};

export default Card;
