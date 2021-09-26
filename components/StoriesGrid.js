import React, { Fragment } from 'react'
import { arrayOf, func, shape, string, bool } from 'prop-types'
import StoryItem from './StoryItem'
import Button from './Button'
import StoriesList from './styles/StoriesList'
import story from '../types/story'
function loadMoreStories(fetchMore, cursor) {
  fetchMore({
    variables: { cursor },
    updateQuery: (previousResult, { fetchMoreResult }) =>
      !fetchMoreResult
        ? previousResult
        : {
            stories: {
              ...fetchMoreResult.stories,
              edges: [
                ...previousResult.stories.edges,
                ...fetchMoreResult.stories.edges,
              ],
            },
          },
  })
}
function StoriesGrid({ edges, pageInfo, fetchMore, userId }) {
  return (
    <Fragment>
      <StoriesList>
        {edges.map(story => (
          <StoryItem
            isStoryOwner={userId === story.user.id}
            key={story.id}
            {...story}
          />
        ))}
      </StoriesList>
      {pageInfo.hasNextPage && (
        <Button
          style={{
            width: '320px',
            margin: '20px auto',
            display: 'block',
          }}
          onClick={() => {
            loadMoreStories(fetchMore, pageInfo.endCursor)
          }}
        >
          Далее
        </Button>
      )}
    </Fragment>
  )
}
StoriesGrid.propTypes = {
  edges: arrayOf(story).isRequired,
  pageInfo: shape({
    endCursor: string.isRequired,
    hasNextPage: bool.isRequired,
  }).isRequired,
  fetchMore: func.isRequired,
  userId: string,
}
export default StoriesGrid
