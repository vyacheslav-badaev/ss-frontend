import React, { forwardRef } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Router from 'next/router'
import { start, done, configure } from 'nprogress'
import Nav from './nav'
import withHideHeader from '../hoc/with-hide-header'
configure({ showSpinner: false })
Router.onRouteChangeStart = () => {
  start()
}
Router.onRouteChangeComplete = () => {
  done()
}
Router.onRouteChangeError = () => {
  done()
}
const Logo = styled.h1`
  margin: 0;
  font-family: ${props => props.theme.logoFont};
  font-size: 3rem;
  letter-spacing: -1.5px;
  position: relative;
  z-index: 2;
  a {
    color: ${props => props.theme.black};
  }
`
const StyledHeader = styled.header`
  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.white};
  z-index: 1;
  display: flex;
  align-items: center;
  will-change: top;
  transition: top 0.3s;
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    max-width: 1024px;
    padding: 0 24px;
    margin: 0 auto;
  }
`
const Header = forwardRef(function HeaderWithRef(props, ref) {
  return (
    <StyledHeader ref={ref}>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Shortstories</a>
          </Link>
        </Logo>
        <Nav />
      </div>
    </StyledHeader>
  )
})
export default withHideHeader(Header)
