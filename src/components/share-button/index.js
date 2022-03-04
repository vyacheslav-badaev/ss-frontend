import React from 'react'
import cn from 'classnames'
import styles from './styles.css'
function ShareButton({ href, title, icon, className = '' }) {
  return (
    <a
      className={cn(styles.button, className)}
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>
        <div aria-hidden="true">
          <img src={icon} alt={title} />
        </div>
      </div>
    </a>
  )
}
export default ShareButton
