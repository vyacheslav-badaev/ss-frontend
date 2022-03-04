import React from 'react'
import Link from 'next/link'
import User from '../user'
import Signout from '../signout'
import styles from './styles.css'
function Nav() {
  return (
    <User>
      {({ data: { me } }) => (
        <>
          <div className={styles['mobile-menu']}>
            <input className={styles.checkbox} type="checkbox" id="toggle" />
            {}
            <label className={styles.button} htmlFor="toggle">
              <span className={styles.icon}>&nbsp;</span>
            </label>
            <div className={styles.background}>&nbsp;</div>
            <nav className={styles.content}>
              <ul>
                {me && (
                  <>
                    <li>
                      <Link href="/create-story">
                        <a className={styles.write}>Написать рассказ</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/me">
                        <a>Профиль</a>
                      </Link>
                    </li>
                    <li>
                      <Signout />
                    </li>
                  </>
                )}
                {!me && (
                  <>
                    <li>
                      <Link href="/signup">
                        <a className={styles.signup}>Регистрация</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/signin">
                        <a>Вход</a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <nav className={styles.nav}>
            {me && (
              <>
                <Link href="/create-story">
                  <a className={styles.write}>Написать рассказ</a>
                </Link>
                <Link href="/me">
                  <a>Профиль</a>
                </Link>
                <Signout />
              </>
            )}
            {!me && (
              <>
                <Link href="/signup">
                  <a className={styles.signup}>Регистрация</a>
                </Link>
                <Link href="/signin">
                  <a>Вход</a>
                </Link>
              </>
            )}
          </nav>
        </>
      )}
    </User>
  )
}
export default Nav
