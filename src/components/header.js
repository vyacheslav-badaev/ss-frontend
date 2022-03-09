import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { start, done, configure } from 'nprogress'
import Nav from './nav'
import styles from './styles/header.css'
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
function Header({ me }) {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <div className={styles.logo}>
          <Link href="/">
            <a>Shortstories</a>
          </Link>
        </div>
        <Nav me={me} />
      </div>
    </header>
  )
}
export default Header
