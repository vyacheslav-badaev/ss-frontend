import React from 'react'
import cn from 'classnames'
import styles from './styles/big-loader.css'
function BigLoader({ className = '' }) {
  return (
    <div className={cn(styles.loader, className)}>
      <div />
    </div>
  )
}
export default BigLoader
