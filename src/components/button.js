import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import cn from 'classnames'
import Loader from './loader'
const Button = ({
  className,
  children,
  disabled,
  type,
  loading,
  onClick,
  style,
  black,
}) => (
  <button
    className={cn(className, { loading })}
    onClick={onClick}
    disabled={disabled || loading}
    loading={loading}
    type={type}
    style={style}
  >
    {loading && black ? <Loader /> : children}
  </button>
)
const blackStyles = props => css`
  font-size: 1.4rem;
  height: 40px;
  color: ${props.theme.white};
  background-color: #454545;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
  &:hover {
    background-color: ${props.theme.softViolet};
  }
  &:active {
    transform: scale(0.98);
  }
  &.loading {
    cursor: wait;
    opacity: 0.7;
    pointer-events: none;
  }
`
const violetStyles = props => css`
  background-color: ${props.theme.softViolet};
  color: ${props.theme.white};
  display: block;
  padding: 0 12px;
  height: 28px;
  line-height: 28px;
  font-size: 1.2rem;
  &:hover {
    background-color: #5c32d5;
  }
`
const StyledButton = styled(Button)`
  text-transform: initial;
  transition: all 0.2s ease;
  border-radius: 4px;
  font-weight: 400;
  ${props => (props.black ? blackStyles(props) : violetStyles(props))};
`
export default StyledButton
