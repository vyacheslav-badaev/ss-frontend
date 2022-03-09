import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import cn from 'classnames'
import { Button, ErrorMessage, UserWithDate } from '.'
import { commentFragment, storyFragment } from '../lib/fragments'
import { STORY_QUERY } from '../lib/queries'
import {
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
} from '../lib/mutations'
import styles from './styles/comments.css'
function editUpdate(cache, payload, id) {
  cache.writeFragment({
    id: `Comment:${id}`,
    fragment: commentFragment,
    fragmentName: 'comment',
    data: payload.data.updateComment,
  })
}
function deleteUpdate(cache, payload, id) {
  const data = cache.readQuery({ query: STORY_QUERY, variables: { id } })
  const story = cache.readFragment({
    id: `Story:${id}`,
    fragment: storyFragment,
    fragmentName: 'story',
  })
  data.comments.edges = data.comments.edges.filter(
    comment => comment.id !== payload.data.deleteComment.id,
  )
  cache.writeQuery({
    query: STORY_QUERY,
    variables: { id },
    data,
  })
  cache.writeFragment({
    id: `Story:${id}`,
    fragment: storyFragment,
    fragmentName: 'story',
    data: {
      ...story,
      stats: {
        ...story.stats,
        comments: story.stats.comments - 1,
      },
    },
  })
}
function CommentEditor({
  comment,
  commentBody,
  onChange,
  me,
  resetAfterUpdate,
  isDarkMode,
}) {
  return (
    <Mutation
      mutation={UPDATE_COMMENT_MUTATION}
      variables={{ id: comment.id, body: commentBody }}
      update={(cache, payload) => editUpdate(cache, payload, comment.id)}
      optimisticResponse={{
        updateComment: {
          id: comment.id,
          body: commentBody,
          user: {
            id: me.id,
            username: me.username,
            photo: me.photo,
            info: me.info,
            __typename: 'User',
          },
          createdAt: new Date().toISOString(),
          __typename: 'Comment',
        },
        __typename: 'Mutation',
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
            maxLength={255}
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
  storyId,
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
              key={`comment-editor-${comment.id}`}
              resetAfterUpdate={resetAfterUpdate}
              comment={comment}
              commentBody={commentBody}
              onChange={onChange}
              isDarkMode={isDarkMode}
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
                        deleteUpdate(cache, payload, storyId)
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
          ),
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
