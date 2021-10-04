import React from 'react'
import styled from '@emotion/styled'
import { node } from 'prop-types'
import Header from './Header'
import Footer from './Footer'
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
    max-width: 1024px;
    min-height: calc(100vh - 184px);
    margin: 0 auto;
    margin-top: 64px;
    padding: 20px;
    padding-bottom: 40px;
  }
`
function Wrapper({ children }) {
  return (
    <Styles>
      <Header />
      <div className="inner">{children}</div>
      <Footer />
    </Styles>
  )
}
Wrapper.propTypes = {
  children: node.isRequired,
}
export default Wrapper
