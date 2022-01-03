import React from 'react'
import { Mutation } from 'react-apollo'
import { StoryReader } from '../src/components'
import { VIEW_STORY_MUTATION } from '../src/lib/mutations'
function Story({ query }) {
  return (
    <Mutation mutation={VIEW_STORY_MUTATION} variables={{ id: query.id }}>
      {viewStory => <StoryReader id={query.id} viewStory={viewStory} />}
    </Mutation>
  )
}
export default Story
