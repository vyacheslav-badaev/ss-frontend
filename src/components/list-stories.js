import React from 'react'
import styled from '@emotion/styled'
import ItemStories from './item-stories'
import Button from './button'
import { fadeInUp } from '../shared-styles/animations'
const StoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 24px;
  max-width: 1300px;
  margin: 0 auto;
  > article {
    animation-name: ${fadeInUp};
    animation-duration: 0.8s;
    animation-fill-mode: backwards;
    animation-timing-function: ease;
    will-change: transform, opacity;
  }
  @media (min-width: 980px) {
    > article:nth-child(3n + 1) {
      animation-delay: 0.2s;
    }
    > article:nth-child(3n + 2) {
      animation-delay: 0.4s;
    }
    > article:nth-child(3n + 3) {
      animation-delay: 0.6s;
    }
  }
  @media (min-width: 660px) and (max-width: 979px) {
    > article:nth-child(2n + 1) {
      animation-delay: 0.2s;
    }
    > article:nth-child(2n + 2) {
      animation-delay: 0.4s;
    }
  }
  @media (max-width: 659px) {
    > article:nth-child(1n + 1) {
      animation-delay: 0.2s;
    }
  }
`
const LoadMoreButton = styled(Button)`
  width: 320px;
  margin: 20px auto;
  display: block;
`
function loadMoreStories(fetchMore, offset) {
  fetchMore({
    variables: { offset },
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
function ListStories({ edges, pageInfo, fetchMore, userId }) {
  return (
    <>
      <StoriesList>
        {edges.map(story => (
          <ItemStories
            isStoryOwner={userId === story.user.id}
            key={story.id}
            {...story}
          />
        ))}
      </StoriesList>
      {edges.length === pageInfo.limit && (
        <LoadMoreButton
          black
          style={{
            width: '320px',
            margin: '20px auto',
            display: 'block',
          }}
          onClick={() => {
            loadMoreStories(fetchMore, edges.length)
          }}
        >
          Далее
        </LoadMoreButton>
      )}
    </>
  )
}
export default ListStories