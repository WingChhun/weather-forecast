import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import makeClass from 'clsx';
import styled from 'styled-components';

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  min-width: 185px;
`;

const StyledInputField = styled.input`
  padding: 8px 4px;
  font-weight:${(props) => props.theme.weight.regular}
  font-size: 16px;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  // border-bottom:2px solid transparent;
  height: 32px;
  line-height: 20px;

  width: ${(props) => props.width || '100%'};
  padding: 4px 8px;
  transition: all .2s ease;
outline:none;

&:focus, &:hover {
  outline:none;
  border-bottom:2px solid ${(props) => props.theme.colors.primary}
  transition: all .2s ease;

}

  @media (max-width: 480px) {
    padding: 8px 10px;
  }

`;

const StyledLabel = styled.div`
  color: ${(props) => props.theme.colors.gray};
  font-size: 14px;

  height: 20px;
  line-height: 20px;
  margin-bottom: 4px;
  text-align: left;
  width: 100%;
`;

const StyledError = styled.div`
  color: ${(props) => props.theme.colors.error};
`;

/**
 * InputField component
 *
 *
 */
const InputField = (props) => {
  const {
    className,
    type,
    labelText,
    placeholder,
    errorMessage,
    onBlur,
    onChange,
    onFocus,
    value,
    ...restProps
  } = props;
  const [displayValue, setDisplayValue] = useState(value);

  const handleChangeEvent = useCallback(
    (event) => {
      const {
        target: { value: fieldValue = '' },
      } = event;

      setDisplayValue(fieldValue);

      /* eslint-disable-next-line */
      onChange && onChange(fieldValue);
    },
    [onChange, setDisplayValue],
  );

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <StyledInputContainer className={makeClass(className)}>
      <StyledLabel className={makeClass()}>{labelText}</StyledLabel>
      <StyledInputField
        type={type}
        value={displayValue}
        onChange={handleChangeEvent}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        {...restProps}
      />
    </StyledInputContainer>
  );
};

InputField.defaultProps = {
  labelText: '',
  placeholder: '',
  type: 'text',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  value: '',
  errorMessage: null,
};
InputField.propTypes = {
  className: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default InputField;
