import React from 'react'
import ListStories from './list-stories'
import BigLoader from './big-loader'
import ErrorMessage from './error-message'
import styles from './styles/main-stories.css'
function MainStories({ me, loading, error, stories, fetchMore }) {
  if (loading) return <BigLoader />
  if (error) return <ErrorMessage error={error} />
  if (!stories.edges.length)
    return (
      <div>
        <h2 className={styles['no-stories']}>Нет рассказов :(</h2>
      </div>
    )
  return <ListStories {...stories} me={me} fetchMore={fetchMore} />
}
export default MainStories
