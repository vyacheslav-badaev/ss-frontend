import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import cookies from 'next-cookies'
import { storyFragment } from '../src/lib/fragments'
import { VIEW_STORY_MUTATION } from '../src/lib/mutations'
import StoryReader from '../src/components/story-reader'
class StoryPage extends Component {
  static async getInitialProps(ctx) {
    const { theme } = cookies(ctx)
    return { theme: theme || 'light' }
  }
  render() {
    const { query, theme } = this.props
    return (
      <Mutation
        mutation={VIEW_STORY_MUTATION}
        variables={{ id: query.id }}
        update={(cache, mutationResult) => {
          const story = cache.readFragment({
            id: `Story:${query.id}`,
            fragment: storyFragment,
            fragmentName: 'story',
          })
          const { userId } = mutationResult.data.viewStory
          cache.writeFragment({
            id: `Story:${query.id}`,
            fragment: storyFragment,
            fragmentName: 'story',
            data: {
              ...story,
              stats: {
                ...story.stats,
                views: [
                  ...story.stats.views,
                  userId
                    ? {
                        id: userId,
                        __typename: 'User',
                      }
                    : null,
                ],
              },
            },
          })
        }}
      >
        {viewStory => (
          <StoryReader id={query.id} viewStory={viewStory} theme={theme} />
        )}
      </Mutation>
    )
  }
}
export default StoryPage
