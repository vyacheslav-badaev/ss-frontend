import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import cn from 'classnames'
import { Button, ErrorMessage, UserWithDate } from '../../src/components'
import { ALL_STORIES_QUERY, STORY_DATA_QUERY } from '../../src/lib/queries'
import {
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
} from '../../src/lib/mutations'
import styles from './styles.css'
function editUpdate(cache, payload, id) {
  const data = cache.readQuery({ query: STORY_DATA_QUERY, variables: { id } })
  data.comments.edges = data.comments.edges.map(comment =>
    payload.data.updateComment.id === comment.id
      ? payload.data.updateComment
      : comment
  )
  cache.writeQuery({
    query: STORY_DATA_QUERY,
    variables: { id },
    data,
  })
}
function deleteUpdate(cache, payload, id) {
  const data = cache.readQuery({ query: STORY_DATA_QUERY, variables: { id } })
  data.comments.edges = data.comments.edges.filter(
    comment => comment.id !== payload.data.deleteComment.id
  )
  cache.writeQuery({
    query: STORY_DATA_QUERY,
    variables: { id },
    data,
  })
  try {
    const stories = cache.readQuery({ query: ALL_STORIES_QUERY })
    stories.stories.edges = stories.stories.edges.map(story =>
      story.id === id
        ? {
            ...story,
            stats: { ...story.stats, comments: story.stats.comments - 1 },
          }
        : story
    )
    cache.writeQuery({
      query: ALL_STORIES_QUERY,
      data: stories,
    })
  } catch (e) {
  }
}
function CommentEditor({
  comment,
  commentBody,
  id,
  onChange,
  me,
  resetAfterUpdate,
  isDarkMode,
}) {
  return (
    <Mutation
      mutation={UPDATE_COMMENT_MUTATION}
      variables={{ id: comment.id, body: commentBody }}
      update={(cache, payload) => editUpdate(cache, payload, id)}
      optimisticResponse={{
        __typename: 'Mutation',
        updateComment: {
          __typename: 'Comment',
          id: comment.id,
          body: commentBody,
          user: {
            __typename: 'User',
            id: me.id,
          },
          createdAt: new Date().toISOString(),
        },
      }}
    >
      {(updateComment, { loading, error }) => (
        <div className={styles['edit-comment']}>
          <ErrorMessage error={error} />
          <ReactTextareaAutosize
            placeholder="Измените комментарий..."
            name="comment"
            id={comment.id}
            value={commentBody}
            onChange={onChange}
            maxLength={300}
            className={cn({ [styles.dark]: isDarkMode })}
          />
          <Button
            black
            disabled={commentBody.length === 0}
            loading={loading}
            onClick={async () => {
              await updateComment()
              resetAfterUpdate()
            }}
          >
            Редактировать
          </Button>
        </div>
      )}
    </Mutation>
  )
}
function ListComments({
  edges,
  editId,
  commentBody,
  onChange,
  id,
  me,
  pageInfo,
  fetchMore,
  resetAfterUpdate,
  activateEditMode,
  isDarkMode,
}) {
  return edges.length > 0 ? (
    <Fragment>
      <ul className={styles['list-comments']}>
        {edges.map(comment =>
          me && editId === comment.id ? (
            <CommentEditor
              resetAfterUpdate={resetAfterUpdate}
              comment={comment}
              commentBody={commentBody}
              onChange={onChange}
              isDarkMode={isDarkMode}
              id={id}
              me={me}
            />
          ) : (
            <li key={comment.id} className={cn({ [styles.dark]: isDarkMode })}>
              <div className={styles['comment-header']}>
                <UserWithDate
                  className={styles['user-and-date']}
                  user={comment.user}
                  date={comment.createdAt}
                />
                {me && me.id === comment.user.id && (
                  <div className={styles['edit-and-delete']}>
                    <button
                      className={cn({ [styles.dark]: isDarkMode })}
                      type="button"
                      onClick={() => {
                        activateEditMode(comment)
                      }}
                    >
                      <img
                        src={
                          isDarkMode
                            ? '/static/icons/dark/edit.svg'
                            : '/static/icons/light/edit.svg'
                        }
                        alt="Редактировать"
                      />
                    </button>
                    <Mutation
                      mutation={DELETE_COMMENT_MUTATION}
                      variables={{ id: comment.id }}
                      update={(cache, payload) =>
                        deleteUpdate(cache, payload, id)
                      }
                      optimisticResponse={{
                        __typename: 'Mutation',
                        deleteComment: {
                          __typename: 'Comment',
                          id: comment.id,
                        },
                      }}
                    >
                      {deleteComment => (
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation()
                            deleteComment()
                          }}
                        >
                          <img
                            src={
                              isDarkMode
                                ? '/static/icons/dark/cross.svg'
                                : '/static/icons/light/cross.svg'
                            }
                            alt="Удалить"
                          />
                        </button>
                      )}
                    </Mutation>
                  </div>
                )}
              </div>
              <p className={styles.body}>{comment.body}</p>
            </li>
          )
        )}
      </ul>
      {pageInfo.hasNextPage && (
        <Button
          black
          className={styles['more-button']}
          onClick={() => {
            fetchMore({
              variables: {
                cursor: pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResult
                }
                return {
                  comments: {
                    ...fetchMoreResult.comments,
                    edges: [
                      ...previousResult.comments.edges,
                      ...fetchMoreResult.comments.edges,
                    ],
                  },
                }
              },
            })
          }}
        >
          More
        </Button>
      )}
    </Fragment>
  ) : (
    <p
      className={cn(styles['no-comments'], {
        [styles.dark]: isDarkMode,
      })}
    >
      Пока что нет комментариев
    </p>
  )
}
export default ListComments
