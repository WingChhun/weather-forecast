import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import delve from 'dlv';
import makeClass from 'clsx';
import styled from 'styled-components';

const StyledInputContainer = styled.div`
  border: 1px solid orange;
  display: flex;
  flex-direction: column;
  align-content: flex-start;

  max-width: 185px;
`;

const StyledInputField = styled.input`
  padding: 8px 4px;
  border: 2px solid orange;
  border-color: orange;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;

  font-weight:${(props) => delve(props, 'theme.weight.regular', null)}

  font-size: 16px;

  height: 32px;
  line-height: 20px;

  width: 100%;
  padding: 4px 8px;

  @media (max-width: 480px) {
    padding: 8px 10px;
  }
`;

const StyledLabel = styled.div`
  border: 1px solid red;
  color: @theme labelColor;
  font-size: 14px;

  height: 20px;
  line-height: 20px;
  margin-bottom: 4px;
  text-align: left;
  width: 100%;
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
  labelText: 'Input Field',
  placeholder: '',
  type: 'text',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  value: '',
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
};

export default InputField;
