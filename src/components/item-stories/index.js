import React from 'react'
import Router from 'next/router'
import cn from 'classnames'
import { Mutation } from 'react-apollo'
import slugify from '@sindresorhus/slugify'
import UserWithDate from '../user-with-date'
import {
  ALL_STORIES_QUERY,
  LIKED_STORIES_QUERY,
  WRITTEN_STORIES_QUERY,
  USER_STORIES_QUERY,
} from '../../lib/queries'
import { DELETE_STORY_MUTATION } from '../../lib/mutations'
import styles from './styles.css'
function getLength(l) {
  if (l >= 1800 && l < 8000) return 'short'
  if (l >= 8000 && l < 25000) return 'middle'
  return 'long'
}
function rus(l) {
  switch (l) {
    case 'short':
      return 'Короткий'
    case 'middle':
      return 'Средний'
    case 'long':
      return 'Длинный'
    default:
      break
  }
}
function ItemStories({
  isStoryOwner = false,
  id,
  user,
  stats,
  createdAt,
  title,
  body,
  genre,
  length,
  me,
}) {
  const meId = me && me.id
  const hasLike = !!stats.likes.find(l => l.id === meId)
  const hasDislike = !!stats.dislikes.find(d => d.id === meId)
  const hasView = !!stats.views.find(v => v && v.id === meId)
  return (
    <article
      className={styles.wrapper}
      onClick={() => {
        Router.push(`/story?id=${id}`, `/story/${id}-${slugify(title)}`).then(
          () => {
            window.scrollTo(0, 0)
          }
        )
      }}
    >
      {isStoryOwner ? (
        <div className={styles['edit-and-delete']}>
          <button
            type="button"
            onClick={event => {
              event.stopPropagation()
              Router.push(
                `/edit-story?id=${id}`,
                `/edit-story/${id}-${slugify(title)}`
              ).then(() => {
                window.scrollTo(0, 0)
              })
            }}
          >
            <img src="/static/images/icons/edit.svg" alt="Редактировать" />
          </button>
          <Mutation
            mutation={DELETE_STORY_MUTATION}
            variables={{ id }}
            refetchQueries={[
              {
                query: ALL_STORIES_QUERY,
                variables: { genres: [], length: null },
              },
              { query: WRITTEN_STORIES_QUERY, variables: { userId: user.id } },
              { query: LIKED_STORIES_QUERY, variables: { isLiked: true } },
              { query: USER_STORIES_QUERY, variables: { userId: user.id } },
            ]}
          >
            {deleteStory => (
              <button
                type="button"
                onClick={event => {
                  event.stopPropagation()
                  deleteStory()
                }}
              >
                <img src="/static/images/icons/cross.svg" alt="Удалить" />
              </button>
            )}
          </Mutation>
        </div>
      ) : (
        <UserWithDate
          className={styles['author-block']}
          user={user}
          date={createdAt}
        />
      )}
      <div className={styles.labels}>
        {genre && <span className={styles.genre}>{genre.name}</span>}
        <span className={cn(styles.length, styles[getLength(length)])}>
          {rus(getLength(length))}
        </span>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
      <div className={styles['bottom-bar']}>
        <div className={styles['buttons-container']}>
          <div>
            <img
              src={
                hasView
                  ? '/static/images/icons/watched.svg'
                  : '/static/images/icons/watch.svg'
              }
              alt="Просмотры"
            />
            <span>{stats.views.length}</span>
          </div>
          <div>
            <img
              src={
                hasLike
                  ? '/static/images/icons/like-fill-black.svg'
                  : '/static/images/icons/like-fill-grey.svg'
              }
              alt="Лайки"
            />
            <span>{stats.likes.length}</span>
          </div>
          <div>
            <img
              src={
                hasDislike
                  ? '/static/images/icons/dislike-fill-black.svg'
                  : '/static/images/icons/dislike-fill-grey.svg'
              }
              alt="Дизлайки"
            />
            <span>{stats.dislikes.length}</span>
          </div>
          <div>
            <img
              src="/static/images/icons/comment-fill-grey.svg"
              alt="Комменты"
            />
            <span>{stats.comments}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
export default ItemStories
