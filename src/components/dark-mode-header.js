import React from 'react'
import Router from 'next/router'
import cn from 'classnames'
import Logo from './logo'
import styles from './styles/dark-mode-header.css'
function DarkModeHeader({ mode, setMode }) {
  return (
    <header className={cn(styles.header, { [styles.dark]: mode === 'dark' })}>
      <button
        type="button"
        className={styles.back}
        onClick={() => {
          Router.back()
        }}
      >
        <svg
          xmlns="http:
          width="400.004"
          height="400.004"
          viewBox="0 0 400.004 400.004"
        >
          <path
            fill={mode === 'dark' ? '#b8b8b8' : '#222'}
            d="M382.688 182.686H59.116l77.209-77.214c6.764-6.76 6.764-17.726 0-24.485-6.764-6.764-17.73-6.764-24.484 0L5.073 187.757c-6.764 6.76-6.764 17.727 0 24.485l106.768 106.775a17.252 17.252 0 0 0 12.242 5.072c4.43 0 8.861-1.689 12.242-5.072 6.764-6.76 6.764-17.726 0-24.484l-77.209-77.218h323.572c9.562 0 17.316-7.753 17.316-17.315 0-9.562-7.753-17.314-17.316-17.314z"
          />
        </svg>
      </button>
      <Logo />
      <button
        type="button"
        className={styles['toggle-mode']}
        onClick={() => {
          if (mode === 'light') {
            setMode('dark')
            document.cookie = 'theme=dark'
          } else {
            setMode('light')
            document.cookie = 'theme=light'
          }
        }}
      >
        <svg
          xmlns="http:
          width="448"
          height="448.04455"
          viewBox="0 0 448 448.04455"
        >
          <path
            fill={mode === 'dark' ? '#b8b8b8' : '#222'}
            d="M224.023 448.031c85.715.903 164.012-48.488 200.118-126.23a171.044 171.044 0 0 1-72.118 14.23c-97.156-.11-175.89-78.844-176-176 .973-65.719 37.235-125.832 94.91-157.351A334.474 334.474 0 0 0 224.024.03c-123.714 0-224 100.29-224 224 0 123.715 100.286 224 224 224zm0 0"
          />
        </svg>
      </button>
    </header>
  )
}
export default DarkModeHeader
