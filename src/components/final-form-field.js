import React from 'react'
import { Field } from 'react-final-form'
function FinalFormField({ name, validate, children }) {
  return (
    <Field name={name} validate={validate}>
      {props => children(props)}
    </Field>
  )
}
export default FinalFormField
