import React from 'react'
import styled from '@emotion/styled'
import { node } from 'prop-types'
const Styles = styled.main`
  position: relative;
  min-height: 100%;
  color: ${props => props.theme.black};
  &::before {
    content: '';
    background-image: url('/static/images/topography.svg'),
      linear-gradient(20deg, rgb(20, 20, 20), rgb(20, 20, 20));
    background-size: 300px, auto;
    background-repeat: repeat;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    will-change: transform;
    z-index: -1;
  }
  .inner {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
    justify-content: center;
  }
`
function CenterWrapper({ children }) {
  return (
    <Styles>
      <div className="inner">
        <div className="columns">{children}</div>
      </div>
    </Styles>
  )
}
CenterWrapper.propTypes = {
  children: node.isRequired,
}
export default CenterWrapper
