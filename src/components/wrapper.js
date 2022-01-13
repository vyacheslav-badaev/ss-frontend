import React from 'react'
import styled from '@emotion/styled'
import Header from './header'
import Footer from './footer'
function Wrapper({ children, className }) {
  return (
    <main className={className}>
      <Header />
      <div className="inner">{children}</div>
      <Footer />
    </main>
  )
}
const StyledWrapper = styled(Wrapper)`
  &::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #140028;
    background-image: url('/static/images/topography.svg'),
      linear-gradient(20deg, #140028, #141414);
    background-size: 170px, auto;
    background-repeat: repeat;
    z-index: -1;
  }
  .inner {
    max-width: 1024px;
    min-height: calc(100vh - 124px);
    margin: 0 auto;
    margin-top: ${({ isIndex = false }) => (isIndex ? '0' : '64px')};
    padding: 20px;
    padding-bottom: 40px;
  }
`
export default StyledWrapper
