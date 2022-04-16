import React from 'react'
import { BigLoader, ErrorMessage, ListStories } from '.'
import { UserInfo } from './user-info'
import styles from './styles/user-profile.css'
function UserProfile({ me, user, stories, loading, error, fetchMore }) {
  if (error) return <ErrorMessage error={error} />
  if (loading) return <BigLoader />
  return (
    <div>
      <div className={styles.wrapper} style={{ backgroundColor: '#fcfcfc' }}>
        <UserInfo user={user} />
      </div>
      {!stories.edges.length ? (
        <p className={styles['no-stories']}>Нет рассказов</p>
      ) : (
        <ListStories me={me} {...stories} fetchMore={fetchMore} />
      )}
    </div>
  )
}
export default UserProfile
