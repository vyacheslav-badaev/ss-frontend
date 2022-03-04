import React from 'react'
import cn from 'classnames'
import styles from './styles.css'
function Input({
  rootClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  name,
  type = 'text',
  label = '',
  error = '',
  disabled = false,
  readOnly = false,
  placeholder = '',
  rootStyles = {},
  labelStyles = {},
  inputStyles = {},
  errorStyles = {},
  ...rest
}) {
  return (
    <div className={cn(styles.root, rootClassName)} style={rootStyles}>
      {label && (
        <label
          className={cn(styles.label, labelClassName)}
          htmlFor={name}
          style={labelStyles}
        >
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
        className={cn(styles.input, inputClassName)}
      />
      {error && (
        <span className={cn(styles.error, errorClassName)} style={errorStyles}>
          {error}
        </span>
      )}
    </div>
  )
}
export default Input
