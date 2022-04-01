import React from 'react'
import cn from 'classnames'
import Header from './header'
import Footer from './footer'
import styles from './styles/wrapper.css'
function Wrapper({ children, className = '', isIndex = false, me }) {
  return (
    <>
      <Header me={me} />
      <main className={cn(styles.wrapper, className)}>
        <div className={cn(styles.inner, { [styles.index]: isIndex })}>
          {children}
        </div>
        <Footer />
      </main>
    </>
  )
}
export default Wrapper
