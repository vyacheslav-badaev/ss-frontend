import React from 'react'
import styled from '@emotion/styled'
import Router from 'next/router'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import slugify from '@sindresorhus/slugify'
import { getPhoto } from '../lib/helpers'
function routeToUserPage(event, user) {
  event.stopPropagation()
  Router.push(
    `/user?id=${user.id}`,
    `/user/${user.id}-${slugify(user.username)}`
  ).then(() => {
    window.scrollTo(0, 0)
  })
}
function UserWithDate({ className, user, date }) {
  return (
    <div
      tabIndex={-1}
      role="link"
      className={`${className} author`}
      onClick={event => {
        routeToUserPage(event, user)
      }}
    >
      <img className="avatar" src={getPhoto(user.photo)} alt={user.username} />
      <div className="name-with-date">
        <span className="name">{user.username}</span>
        <span className="date">
          {format(date, 'MMM D, YYYY', { locale: ru })}
        </span>
      </div>
    </div>
  )
}
const StyledUserWithDate = styled(UserWithDate)`
  display: flex;
  cursor: pointer;
  &:hover .name-with-date .name::after {
    width: 100%;
  }
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 14px;
  }
  .name-with-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      display: flex;
      color: ${props => props.theme.softViolet};
      font-weight: bold;
      position: relative;
      &::after {
        content: '';
        border-bottom: 3px solid ${props => props.theme.softViolet};
        position: absolute;
        width: 0%;
        bottom: -1px;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
      }
    }
    .date {
      margin-top: 4px;
      color: ${props => props.theme.darkGrey};
      font-size: 1rem;
    }
  }
`
export default StyledUserWithDate
