import React from 'react'
import Router from 'next/router'
import cn from 'classnames'
import { Mutation } from 'react-apollo'
import readingTime from 'reading-time'
import slugify from '@sindresorhus/slugify'
import UserWithDate from './user-with-date'
import { USER_QUERY } from '../lib/queries'
import { DELETE_STORY_MUTATION } from '../lib/mutations'
import styles from './styles/item-stories.css'
function getLength(l) {
  if (l >= 1800 && l < 8000) return 'short'
  if (l >= 8000 && l < 25000) return 'middle'
  return 'long'
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
  me = {},
}) {
  const hasLike = stats.likes.some(l => l && l.id === me)
  const hasDislike = stats.dislikes.some(d => d && d.id === me)
  const hasView = stats.views.some(v => v && v.id === me)
  return (
    <article
      className={styles.wrapper}
      onClick={() => {
        Router.push(`/story?id=${id}`, `/story/${id}-${slugify(title)}`).then(
          () => {
            window.scrollTo(0, 0)
          },
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
                `/edit-story/${id}-${slugify(title)}`,
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
              'INDEX_QUERY',
              'ME_QUERY',
              { query: USER_QUERY, variables: { id: me.id } },
            ]}
            awaitRefetchQueries
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
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.labels}>
        {genre && <span className={styles.genre}>{genre.name}</span>}
        <span className={cn(styles.length, styles[getLength(length)])}>
          Время чтения {Math.ceil(readingTime(body).minutes)} мин
        </span>
      </div>
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
