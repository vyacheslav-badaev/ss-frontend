import React, { useState } from 'react'
import { Query } from 'react-apollo'
import {
  User,
  BigLoader,
  ErrorMessage,
  ListStories,
} from '../../src/components'
import { AccountInfo, AccountEdit } from '../../src/components/users-info'
import {
  WRITTEN_STORIES_QUERY,
  LIKED_STORIES_QUERY,
} from '../../src/lib/queries'
import styles from './styles.css'
function Info() {
  const [tab, setTab] = useState('written')
  const [isEdit, setEdit] = useState(false)
  function renderStories(me, loading, error, stories, fetchMore) {
    if (loading || !stories) return <BigLoader />
    if (error) return <ErrorMessage error={error} />
    return !stories.edges.length ? (
      <p className={styles['no-stories']}>Нет рассказов</p>
    ) : (
      <ListStories
        {...stories}
        userId={tab === 'written' ? me.id : null}
        fetchMore={fetchMore}
      />
    )
  }
  return (
    <User>
      {({ data: { me } }) => (
        <Query
          query={
            tab === 'written' ? WRITTEN_STORIES_QUERY : LIKED_STORIES_QUERY
          }
          variables={
            tab === 'written' && me
              ? { userId: me.id, isLiked: false }
              : { userId: null, isLiked: true }
          }
        >
          {({ data: { stories }, loading, error, fetchMore }) => (
            <div>
              {isEdit ? (
                <AccountEdit me={me} setEdit={setEdit} />
              ) : (
                <AccountInfo me={me} setEdit={setEdit} />
              )}
              <div className={styles.tabs}>
                <button
                  className={tab === 'written' ? styles.active : ''}
                  type="button"
                  role="tab"
                  onClick={() => {
                    setTab('written')
                  }}
                >
                  Написанные
                </button>
                <button
                  className={tab === 'favs' ? styles.active : ''}
                  type="button"
                  role="tab"
                  onClick={() => {
                    setTab('favs')
                  }}
                >
                  Понравившиеся
                </button>
              </div>
              {renderStories(me, loading, error, stories, fetchMore)}
            </div>
          )}
        </Query>
      )}
    </User>
  )
}
export default Info
