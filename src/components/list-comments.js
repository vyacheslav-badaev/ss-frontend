import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { groupBy } from 'ramda'
import cn from 'classnames'
import compareDesc from 'date-fns/compare_desc'
import nanoid from 'nanoid'
import { Button, ErrorMessage, UserWithDate } from '.'
import { commentFragment, storyFragment } from '../lib/fragments'
import { STORY_QUERY } from '../lib/queries'
import {
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  CREATE_COMMENT_MUTATION,
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
function deleteUpdate(cache, payload, id, hasChildren, parentId) {
  const data = cache.readQuery({ query: STORY_QUERY, variables: { id } })
  const story = cache.readFragment({
    id: `Story:${id}`,
    fragment: storyFragment,
    fragmentName: 'story',
  })
  if (parentId) {
    const parentComment = data.comments.find(comment => comment.id === parentId)
    if (parentComment.body === null) {
      data.comments = data.comments.filter(
        comment =>
          comment.id !== payload.data.deleteComment.id &&
          comment.id !== parentComment.id,
      )
    }
  }
  if (!hasChildren) {
    data.comments = data.comments.filter(
      comment => comment.id !== payload.data.deleteComment.id,
    )
  } else {
    data.comments = data.comments.map(comment => {
      if (comment.id === payload.data.deleteComment.id) {
        return {
          ...comment,
          body: null,
        }
      }
      return comment
    })
  }
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
  comments,
  editId,
  commentBody,
  onChange,
  storyId,
  me,
  resetAfterUpdate,
  activateEditMode,
  isDarkMode,
}) {
  const [replyCommentId, setReplyCommentId] = useState(null)
  const [replyCommentBody, setReplyCommentBody] = useState('')
  const byCommentId = groupBy(comment => comment.commentId)
  const groupedComments = byCommentId(comments)
  const parentComments = groupedComments['null']
  const recurComments = (array = parentComments, id, parentId) => {
    const isParent = !(id && id !== parentId)
    const commentsArray = isParent ? array : groupedComments[id]
    if (!Array.isArray(commentsArray)) return null
    return (
      <ul
        className={cn(styles['list-comments'], {
          [styles['parent-comments']]: isParent,
        })}
      >
        {commentsArray.map(comment =>
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
                {me.id === comment.user.id && comment.body !== null && (
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
                      variables={{
                        id: comment.id,
                        hasChildren: !!groupedComments[comment.id],
                        commentId: comment.commentId,
                      }}
                      update={(cache, payload) =>
                        deleteUpdate(
                          cache,
                          payload,
                          storyId,
                          !!groupedComments[comment.id],
                          comment.commentId,
                        )
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
                          className={cn({ [styles.dark]: isDarkMode })}
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
              <p className={styles.body}>
                {comment.body === null
                  ? 'Комментарий удалён автором'
                  : comment.body}
              </p>
              {replyCommentId && replyCommentId === comment.id ? (
                <Mutation
                  mutation={CREATE_COMMENT_MUTATION}
                  variables={{
                    id: storyId,
                    commentId: comment.id,
                    body: replyCommentBody,
                  }}
                  update={(cache, mutationResult) => {
                    const storyQuery = cache.readQuery({
                      query: STORY_QUERY,
                      variables: { id: storyId },
                    })
                    const story = cache.readFragment({
                      id: `Story:${storyId}`,
                      fragment: storyFragment,
                      fragmentName: 'story',
                    })
                    storyQuery.comments = [
                      ...storyQuery.comments,
                      mutationResult.data.createComment,
                    ].sort((a, b) => compareDesc(a.createdAt, b.createdAt))
                    cache.writeQuery({
                      query: STORY_QUERY,
                      variables: { id: storyId },
                      data: storyQuery,
                    })
                    cache.writeFragment({
                      id: `Story:${storyId}`,
                      fragment: storyFragment,
                      fragmentName: 'story',
                      data: {
                        ...story,
                        stats: {
                          ...story.stats,
                          comments: story.stats.comments + 1,
                        },
                      },
                    })
                  }}
                  optimisticResponse={{
                    createComment: {
                      id: nanoid(10),
                      commentId: comment.id,
                      body: replyCommentBody,
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
                  {createComment => (
                    <div className={styles['reply-section']}>
                      <ReactTextareaAutosize
                        autoFocus
                        placeholder="Напишите ответ..."
                        value={replyCommentBody}
                        maxLength={255}
                        className={styles['reply-textarea']}
                        onChange={e => {
                          setReplyCommentBody(e.target.value)
                        }}
                      />
                      <div className={styles['reply-buttons']}>
                        <Button
                          onClick={async () => {
                            await createComment()
                            setReplyCommentBody('')
                            setReplyCommentId(null)
                          }}
                          disabled={replyCommentBody.length === 0}
                          violet
                        >
                          Ответить
                        </Button>
                        <button
                          className={styles['cancel-button']}
                          type="button"
                          onClick={() => {
                            setReplyCommentId(null)
                          }}
                        >
                          Отменить
                        </button>
                      </div>
                    </div>
                  )}
                </Mutation>
              ) : +me.id > 0 && comment.body !== null ? (
                <button
                  className={styles.reply}
                  type="button"
                  onClick={() => {
                    if (replyCommentId !== null) setReplyCommentId(null)
                    setReplyCommentId(comment.id)
                  }}
                >
                  Ответить
                </button>
              ) : null}
              {recurComments(
                groupedComments[comment.commentId],
                comment.id,
                comment.commentId,
              )}
            </li>
          ),
        )}
      </ul>
    )
  }
  return parentComments && parentComments.length ? (
    recurComments()
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
