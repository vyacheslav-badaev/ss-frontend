import React from 'react'
import Link from 'next/link'
import styles from './styles/logo.css'
function Logo() {
  return (
    <Link href="/">
      <a>
        <div className={styles.logo}>Shortstories</div>
      </a>
    </Link>
  )
}
export default Logo
