import React from 'react'
import styled from '@emotion/styled'
import { spin, reverseSpin } from '../shared-styles/animations'
function Loader({ className }) {
  return (
    <div className={className}>
      <div className="outer" />
      <div className="inner" />
    </div>
  )
}
const StyledLoader = styled(Loader)`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  .inner,
  .outer {
    position: absolute;
    border: 4px solid ${props => props.theme.pink};
    border-radius: 50%;
  }
  .outer {
    width: 100%;
    height: 100%;
    border-left-color: transparent;
    border-bottom: 0;
    animation: ${spin} 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  }
  .inner {
    width: 20px;
    height: 20px;
    left: calc(50% - 10px);
    top: calc(50% - 10px);
    border-right: 0;
    border-top-color: transparent;
    animation: ${reverseSpin} 1.5s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  }
`
export default StyledLoader
