import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Button, ErrorMessage, UserWithDate } from '../../src/components'
import { ALL_STORIES_QUERY, STORY_DATA_QUERY } from '../../src/lib/queries'
import {
  UPDATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
} from '../../src/lib/mutations'
const List = styled.ul`
  margin: 0;
  margin-top: 20px;
  padding: 0;
  list-style-type: none;
  padding-bottom: 40px;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .comment-header {
    display: flex;
    align-items: center;
    .author {
      width: 100%;
    }
  }
  .edit-and-delete {
    display: flex;
    justify-content: flex-end;
    position: relative;
    width: 100%;
    top: -20px;
    right: -20px;
    button {
      width: 50px;
      height: 50px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s ease-in-out;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: ${({ theme, isDarkMode }) =>
          isDarkMode ? 'initial' : theme.lightGrey};
      }
    }
  }
  .edit-comment {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    > textarea {
      border: none;
      font-family: ${props => props.theme.uiFont};
      min-height: 63px;
      padding: 20px;
      font-size: 1.6rem;
      color: ${({ theme, isDarkMode }) =>
        isDarkMode ? theme.nightGrey : theme.black};
    }
  }
  li {
    position: relative;
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 20px;
    overflow: hidden;
    color: ${({ theme, isDarkMode }) =>
      isDarkMode ? theme.nightGrey : theme.black};
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.2);
    .body {
      margin-top: 18px;
    }
  }
`
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
        <div className="edit-comment">
          <ErrorMessage error={error} />
          <ReactTextareaAutosize
            placeholder="Измените комментарий..."
            name="comment"
            id={comment.id}
            value={commentBody}
            onChange={onChange}
            maxLength={300}
          />
          <Button
            black
            disabled={commentBody.length === 0}
            loading={loading}
            type="button"
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
      <List isDarkMode={isDarkMode}>
        {edges.map(comment =>
          me && editId === comment.id ? (
            <CommentEditor
              resetAfterUpdate={resetAfterUpdate}
              comment={comment}
              commentBody={commentBody}
              onChange={onChange}
              id={id}
              me={me}
            />
          ) : (
            <li key={comment.id}>
              <div className="comment-header">
                <UserWithDate
                  className="user-and-date"
                  user={comment.user}
                  date={comment.createdAt}
                />
                {me && me.id === comment.user.id && (
                  <div className="edit-and-delete">
                    <button
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
              <p className="body">{comment.body}</p>
            </li>
          )
        )}
      </List>
      {pageInfo.hasNextPage && (
        <Button
          black
          className="more-button"
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
    <p className="no-comments">Пока что нет комментариев</p>
  )
}
export default ListComments
