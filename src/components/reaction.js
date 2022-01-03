import React from 'react'
import { Mutation } from 'react-apollo'
import { STORY_DATA_QUERY } from '../lib/queries'
import { LIKE_MUTATION, DISLIKE_MUTATION } from '../lib/mutations'
import ReactionButton from '../shared-styles/reaction-button'
function Reaction({ id, qty, state, active, dark }) {
  function getIcon() {
    if (state === 'like') {
      return active
        ? '/static/images/icons/like-fill.svg'
        : '/static/images/icons/like.svg'
    }
    if (state === 'dislike') {
      return active
        ? '/static/images/icons/dislike-fill.svg'
        : '/static/images/icons/dislike.svg'
    }
  }
  const mutation = state === 'like' ? LIKE_MUTATION : DISLIKE_MUTATION
  return (
    <Mutation
      mutation={mutation}
      variables={{ id }}
      refetchQueries={[
        { query: STORY_DATA_QUERY, variables: { id, limit: 10 } },
      ]}
    >
      {mutate => (
        <ReactionButton dark={dark}>
          <button
            type="button"
            onClick={() => {
              mutate()
            }}
          >
            <img src={getIcon()} alt={state} />
          </button>
          <span>{qty}</span>
        </ReactionButton>
      )}
    </Mutation>
  )
}
export default Reaction
