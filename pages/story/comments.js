import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import compareDesc from 'date-fns/compare_desc'
import nanoid from 'nanoid'
import { Button, ErrorMessage } from '../../src/components'
import ListComments from './list-comments'
import { ALL_STORIES_QUERY, STORY_DATA_QUERY } from '../../src/lib/queries'
import { CREATE_COMMENT_MUTATION } from '../../src/lib/mutations'
const CommentsStyles = styled.div`
  max-width: 700px;
  padding: 0 24px;
  margin: 0 auto;
  margin-top: 12px;
  border-top: 1px solid ${props => props.theme.lightGrey};
  .create-comment {
    display: flex;
    flex-direction: column;
    > textarea {
      font-family: ${props => props.theme.uiFont};
      border: none;
      min-height: 63px;
      padding: 20px;
      font-size: 1.6rem;
      color: ${({ theme, isDarkMode }) =>
        isDarkMode ? theme.nightGrey : theme.black};
    }
  }
  .no-comments {
    padding: 24px 0;
  }
  .more-button {
    width: 100%;
  }
`
function update(cache, payload, id) {
  const story = cache.readQuery({ query: STORY_DATA_QUERY, variables: { id } })
  story.comments.edges = [
    ...story.comments.edges,
    payload.data.createComment,
  ].sort((a, b) => compareDesc(a.createdAt, b.createdAt))
  cache.writeQuery({
    query: STORY_DATA_QUERY,
    variables: { id },
    data: story,
  })
  try {
    const stories = cache.readQuery({ query: ALL_STORIES_QUERY })
    stories.stories.edges = stories.stories.edges.map(s =>
      s.id === id
        ? {
            ...story,
            stats: { ...s.stats, comments: s.stats.comments + 1 },
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
function Comments({ edges, pageInfo, fetchMore, id, me, isDarkMode }) {
  const [body, setBody] = useState('')
  const [editId, setEditId] = useState(null)
  const [commentBody, setCommentBody] = useState('')
  return (
    <CommentsStyles isDarkMode={isDarkMode}>
      {me && (
        <Mutation
          mutation={CREATE_COMMENT_MUTATION}
          variables={{ id, body }}
          update={(cache, payload) => update(cache, payload, id)}
          optimisticResponse={{
            __typename: 'Mutation',
            createComment: {
              __typename: 'Comment',
              id: nanoid(10),
              body,
              user: {
                __typename: 'User',
                id: me.id,
              },
              createdAt: new Date().toISOString(),
            },
          }}
        >
          {(createComment, { loading, error }) => (
            <div className="create-comment">
              <ErrorMessage error={error} />
              <ReactTextareaAutosize
                placeholder="Оставьте комментарий..."
                name="body"
                id="body"
                value={body}
                onChange={e => {
                  setBody(e.target.value)
                }}
                maxLength={300}
              />
              <Button
                black
                disabled={body.length === 0}
                loading={loading}
                type="button"
                onClick={async () => {
                  await createComment()
                  setBody('')
                }}
              >
                Написать
              </Button>
            </div>
          )}
        </Mutation>
      )}
      <ListComments
        isDarkMode={isDarkMode}
        edges={edges}
        editId={editId}
        commentBody={commentBody}
        onChange={e => {
          setCommentBody(e.target.value)
        }}
        id={id}
        me={me}
        pageInfo={pageInfo}
        fetchMore={fetchMore}
        resetAfterUpdate={() => {
          setEditId(null)
          setCommentBody('')
        }}
        activateEditMode={comment => {
          setEditId(comment.id)
          setCommentBody(comment.body)
        }}
      />
    </CommentsStyles>
  )
}
export default Comments
