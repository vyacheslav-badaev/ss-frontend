import React from 'react'
import styled from '@emotion/styled'
import Router from 'next/router'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import getPhoto from '../lib/get-photo'
const UserAndDateStyles = styled.div`
  display: flex;
  cursor: pointer;
  &:hover {
    .name-and-date {
      .name::after {
        width: 100%;
      }
    }
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    margin-right: 15px;
  }
  .name-and-date {
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
function routeToUserPage(event, id) {
  event.stopPropagation()
  Router.push(`/user?id=${id}`).then(() => {
    window.scrollTo(0, 0)
  })
}
function UserAndDate({ className = '', style = {}, user, date }) {
  return (
    <UserAndDateStyles
      role="link"
      style={style}
      className={`${className} author`}
      onClick={event => {
        routeToUserPage(event, user.id)
      }}
    >
      <img className="avatar" src={getPhoto(user.photo)} alt={user.username} />
      <div className="name-and-date">
        <span className="name">{user.username}</span>
        <span className="date">
          {format(date, 'MMM D, YYYY', { locale: ru })}
        </span>
      </div>
    </UserAndDateStyles>
  )
}
export default UserAndDate
