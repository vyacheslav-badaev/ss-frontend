import React from 'react'
import styled from '@emotion/styled'
function Input({
  className,
  name,
  type,
  label,
  error,
  disabled,
  readOnly,
  placeholder,
  rootStyles,
  labelStyles,
  inputStyles,
  errorStyles,
  ...rest
}) {
  return (
    <div className={className} style={rootStyles}>
      {label && (
        <label htmlFor={name} style={labelStyles}>
          {label}
        </label>
      )}
      <input
        {...rest}
        autoComplete="new-password"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        style={inputStyles}
      />
      {error && (
        <span className="error" style={errorStyles}>
          {error}
        </span>
      )}
    </div>
  )
}
const StyledInput = styled(Input)`
  display: flex;
  flex-direction: column;
  position: relative;
  label {
    font-size: 1.2rem;
    position: absolute;
    top: -5px;
    left: 14px;
    background-color: #fff;
  }
  input {
    border-radius: 4px;
    border: 1px solid ${props => props.theme.lightGrey};
    height: 46px;
    font-size: 1.6rem;
    padding: 0 14px;
    background-color: #fff;
    transition: all 0.2s ease;
    &:focus {
      border: 1px solid
        ${({ error, theme }) => (error ? theme.red : theme.softViolet)};
    }
  }
  .error {
    font-size: 1rem;
    margin-top: 4px;
    color: ${props => props.theme.red};
  }
`
export default StyledInput
