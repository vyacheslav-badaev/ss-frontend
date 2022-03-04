import React, { forwardRef } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { start, done, configure } from 'nprogress'
import Nav from '../nav'
import withHideHeader from '../../hoc/with-hide-header'
import styles from './styles.css'
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
const Header = forwardRef(function HeaderWithRef(props, ref) {
  return (
    <header className={styles.header} ref={ref}>
      <div className={styles.bar}>
        <h2 className={styles.logo}>
          <Link href="/">
            <a>Shortstories</a>
          </Link>
        </h2>
        <Nav />
      </div>
    </header>
  )
})
export default withHideHeader(Header)
