import React from 'react'
import styled from '@emotion/styled'
import { spin } from '../shared-styles/animations'
function BigLoader({ className }) {
  return (
    <div className={className}>
      <div />
    </div>
  )
}
const StyledBigLoader = styled(BigLoader)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  div {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 90px;
    height: 90px;
    margin: -45px 0 0 -45px;
    z-index: 1500;
    border: 3px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
    &::before,
    &::after {
      content: '';
      position: absolute;
      border: 3px solid transparent;
      border-radius: 50%;
    }
    &::before {
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-top-color: #e5e5e5;
      animation: ${spin} 3s linear infinite;
    }
    &::after {
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-top-color: #cccccc;
      animation: ${spin} 1.5s linear infinite;
    }
  }
`
export default StyledBigLoader
