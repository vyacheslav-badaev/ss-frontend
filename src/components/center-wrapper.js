import React from 'react'
import cn from 'classnames'
import styles from './styles/center-wrapper.css'
function CenterWrapper({ children, className = '' }) {
  return (
    <main className={cn(styles.wrapper, className)}>
      <div className={styles.inner}>
        <div className={styles.columns}>{children}</div>
      </div>
    </main>
  )
}
export default CenterWrapper
