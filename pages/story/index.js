import React from 'react'
import { Mutation } from 'react-apollo'
import { VIEW_STORY_MUTATION } from '../../src/lib/mutations'
import Reader from './reader'
function Story({ query }) {
  return (
    <Mutation mutation={VIEW_STORY_MUTATION} variables={{ id: query.id }}>
      {viewStory => <Reader id={query.id} viewStory={viewStory} />}
    </Mutation>
  )
}
export default Story
