import React from 'react'
import Router from 'next/router'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import slugify from '@sindresorhus/slugify'
import cn from 'classnames'
import { getPhoto } from '../lib/helpers'
import styles from './styles/user-with-date.css'
function routeToUserPage(event, user) {
  event.stopPropagation()
  Router.push(
    `/user?id=${user.id}`,
    `/user/${user.id}-${slugify(user.username)}`,
  ).then(() => {
    window.scrollTo(0, 0)
  })
}
function UserWithDate({ className = '', user, date }) {
  return (
    <div
      tabIndex={-1}
      role="link"
      className={cn('author', styles.wrapper, className)}
      onClick={event => {
        routeToUserPage(event, user)
      }}
    >
      <img
        className={styles.avatar}
        src={getPhoto(user.photo)}
        alt={user.username}
      />
      <div className={styles['name-with-date']}>
        <span className={styles.name}>{user.username}</span>
        <span className={styles.date}>
          {format(date, 'MMM D, YYYY', { locale: ru })}
        </span>
      </div>
    </div>
  )
}
export default UserWithDate
