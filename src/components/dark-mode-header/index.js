import React, { forwardRef } from 'react'
import Router from 'next/router'
import cn from 'classnames'
import Logo from '../logo'
import withHideHeader from '../../hoc/with-hide-header'
import styles from './styles.css'
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
    <header
      ref={ref}
      className={cn(styles.header, { [styles.dark]: mode === 'dark' })}
    >
      <button
        type="button"
        className={styles.back}
        onClick={() => {
          Router.back()
        }}
      />
      <Logo />
      <button
        type="button"
        className={styles['toggle-mode']}
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
    </header>
  )
})
export default withHideHeader(DarkModeHeader)
