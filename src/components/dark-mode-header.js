import React, { forwardRef } from 'react'
import Router from 'next/router'
import styled from '@emotion/styled'
import cn from 'classnames'
import Logo from './logo'
import withHideHeader from '../hoc/with-hide-header'
const Header = styled.header`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  will-change: top;
  top: 0;
  transition: top 0.3s, background-color 0.45s ease-in-out;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  h2 {
    color: ${props => props.theme.black};
  }
  .back,
  .toggle-mode {
    position: absolute;
    background-size: contain;
    width: 48px;
    height: 48px;
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.85;
    }
  }
  .back {
    left: 24px;
    background-image: url('/static/images/icons/left-arrow.svg');
  }
  .toggle-mode {
    right: 24px;
    background-image: url('/static/images/icons/moon.svg');
  }
  &.dark {
    background-color: #111;
    h2 {
      color: ${props => props.theme.nightGrey};
    }
    .back {
      background-image: url('/static/images/icons/left-arrow-grey.svg');
    }
    .toggle-mode {
      background-image: url('/static/images/icons/moon-grey.svg');
    }
  }
`
const isBrowser = process.browser
function setModeInLS(mode) {
  if (!isBrowser) return
  localStorage.setItem('theme', mode)
}
const DarkModeHeader = forwardRef(function DarkModeHeaderWithRef(
  { mode, setMode },
  ref
) {
  return (
    <Header ref={ref} className={cn({ dark: mode === 'dark' })}>
      <button
        type="button"
        className="back"
        onClick={() => {
          Router.back()
        }}
      />
      <Logo />
      <button
        type="button"
        className="toggle-mode"
        onClick={() => {
          if (mode === 'light') {
            setMode('dark')
            setModeInLS('dark')
          } else {
            setMode('light')
            setModeInLS('light')
          }
        }}
      />
    </Header>
  )
})
export default withHideHeader(DarkModeHeader)
