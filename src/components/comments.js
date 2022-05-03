import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import compareDesc from 'date-fns/compare_desc'
import nanoid from 'nanoid'
import cn from 'classnames'
import { Button, ErrorMessage } from '.'
import ListComments from './list-comments'
import { storyFragment } from '../lib/fragments'
import { STORY_QUERY } from '../lib/queries'
import { CREATE_COMMENT_MUTATION } from '../lib/mutations'
import styles from './styles/comments.css'
function Comments({ comments, id, me, isDarkMode }) {
  const [body, setBody] = useState('')
  const [editId, setEditId] = useState(null)
  const [commentBody, setCommentBody] = useState('')
  return (
    <div className={styles.comments}>
      {+me.id > 0 && (
        <Mutation
          mutation={CREATE_COMMENT_MUTATION}
          variables={{ id, body }}
          update={(cache, mutationResult) => {
            const storyQuery = cache.readQuery({
              query: STORY_QUERY,
              variables: { id },
            })
            const story = cache.readFragment({
              id: `Story:${id}`,
              fragment: storyFragment,
              fragmentName: 'story',
            })
            storyQuery.comments = [
              ...storyQuery.comments,
              mutationResult.data.createComment,
            ].sort((a, b) => compareDesc(a.createdAt, b.createdAt))
            cache.writeQuery({
              query: STORY_QUERY,
              variables: { id },
              data: storyQuery,
            })
            cache.writeFragment({
              id: `Story:${id}`,
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
              commentId: null,
              body,
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
                maxLength={255}
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
        comments={comments}
        editId={editId}
        commentBody={commentBody}
        onChange={e => {
          setCommentBody(e.target.value)
        }}
        storyId={id}
        me={me}
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
