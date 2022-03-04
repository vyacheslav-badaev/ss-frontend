import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import compareDesc from 'date-fns/compare_desc'
import nanoid from 'nanoid'
import cn from 'classnames'
import { Button, ErrorMessage } from '../../src/components'
import ListComments from './list-comments'
import { ALL_STORIES_QUERY, STORY_DATA_QUERY } from '../../src/lib/queries'
import { CREATE_COMMENT_MUTATION } from '../../src/lib/mutations'
import styles from './styles.css'
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
    <div className={styles.comments}>
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
            <div className={styles['create-comment']}>
              <ErrorMessage error={error} />
              <ReactTextareaAutosize
                placeholder="Оставьте комментарий..."
                name="body"
                id="body"
                value={body}
                className={cn({ [styles.dark]: isDarkMode })}
                onChange={e => {
                  setBody(e.target.value)
                }}
                maxLength={300}
              />
              <Button
                black
                disabled={body.length === 0}
                loading={loading}
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
    </div>
  )
}
export default Comments
