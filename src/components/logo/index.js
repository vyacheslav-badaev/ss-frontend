import React from 'react'
import Link from 'next/link'
import styles from './styles.css'
function Logo() {
  return (
    <Link href="/">
      <a>
        <h2 className={styles.logo}>Shortstories</h2>
      </a>
    </Link>
  )
}
export default Logo
