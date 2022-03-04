import React from 'react'
import cn from 'classnames'
import Loader from '../loader'
import styles from './styles.css'
function Button({
  black,
  violet,
  className = '',
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  style = {},
}) {
  return (
    <button
      style={style}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={cn(
        styles.button,
        {
          [styles.black]: black,
          [styles.violet]: violet,
          [styles.loading]: loading,
        },
        className
      )}
    >
      {loading ? <Loader /> : children}
    </button>
  )
}
export default Button
