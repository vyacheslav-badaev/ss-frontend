import React from 'react'
import cn from 'classnames'
import styles from './styles/loader.css'
function Loader({ className = '' }) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.outer} />
      <div className={styles.inner} />
    </div>
  )
}
export default Loader
