import React from 'react'
import styled from '@emotion/styled'
import TextareaAutosize from 'react-textarea-autosize'
function Textarea({
  className,
  name,
  label,
  error,
  disabled,
  readOnly,
  placeholder,
  maxLength,
  rootStyles,
  labelStyles,
  textareaStyles,
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
      <TextareaAutosize
        {...rest}
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        style={textareaStyles}
        maxLength={maxLength}
      />
      {error && (
        <span className="error" style={errorStyles}>
          {error}
        </span>
      )}
    </div>
  )
}
const StyledTextarea = styled(Textarea)`
  textarea {
    resize: none;
  }
`
export default StyledTextarea
