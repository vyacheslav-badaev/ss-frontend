import React from 'react'
import Link from 'next/link'
import styles from './styles/logo.css'
function Logo() {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <img src="/static/images/writer.svg" alt="" />
      </a>
    </Link>
  )
}
export default Logo
