import React from 'react'
import { BigLoader, ErrorMessage, ListStories } from '.'
import { UserInfo } from './user-info'
function UserProfile({ me, user, stories, loading, error, fetchMore }) {
  if (error) return <ErrorMessage error={error} />
  if (loading) return <BigLoader />
  return (
    <div>
      <UserInfo user={user} />
      {!stories.edges.length ? (
        <p>Нет рассказов :(</p>
      ) : (
        <ListStories me={me} {...stories} fetchMore={fetchMore} />
      )}
    </div>
  )
}
export default UserProfile
