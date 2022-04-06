import React, { useState } from 'react'
import { BigLoader, ErrorMessage, ListStories } from '.'
import { AccountInfo, AccountEdit } from './user-info'
import styles from './styles/me-info.css'
function MeInfo({ me, data, loading, error, fetchMore }) {
  const [tab, setTab] = useState('written')
  const [isEdit, setEdit] = useState(false)
  const stories = tab === 'written' ? data.writtenStories : data.favStories
  function renderStories(stories) {
    return !stories.edges.length ? (
      <p className={styles['no-stories']}>Нет рассказов</p>
    ) : (
      <ListStories
        {...stories}
        me={me}
        userId={tab === 'written' ? me.id : null}
        fetchMore={fetchMore}
      />
    )
  }
  if (loading) return <BigLoader />
  if (error) return <ErrorMessage error={error} />
  return (
    <>
      <div className={styles.wrapper}>
        {isEdit ? (
          <AccountEdit me={me} setEdit={setEdit} />
        ) : (
          <AccountInfo me={me} setEdit={setEdit} />
        )}
      </div>
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
      {renderStories(stories)}
    </>
  )
}
export default MeInfo
