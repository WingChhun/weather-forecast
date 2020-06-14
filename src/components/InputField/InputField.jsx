import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import makeClass from 'clsx';

import * as Styled from './styled';

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
    <Styled.InputContainer className={makeClass(className)}>
      <Styled.Label>{labelText}</Styled.Label>
      <Styled.InputField
        type={type}
        value={displayValue}
        onChange={handleChangeEvent}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        {...restProps}
      />
    </Styled.InputContainer>
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
