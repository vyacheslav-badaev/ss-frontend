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
