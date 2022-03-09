import React, { Component } from 'react'
import { Field } from 'react-final-form'
class DebouncingValidatingField extends Component {
  static defaultProps = {
    debounce: 400,
  }
  validate = (...args) =>
    new Promise(resolve => {
      if (this.clearTimeout) this.clearTimeout()
      const timerId = setTimeout(() => {
        resolve(this.props.validate(...args))
      }, this.props.debounce)
      this.clearTimeout = () => {
        clearTimeout(timerId)
        resolve()
      }
    })
  render() {
    return <Field {...this.props} validate={this.validate} />
  }
}
export default DebouncingValidatingField
