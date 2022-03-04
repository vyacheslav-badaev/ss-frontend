import React from 'react'
import ItemStories from '../item-stories'
import Button from '../button'
import styles from './styles.css'
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
function ListStories({ edges, pageInfo, fetchMore, userId, me }) {
  return (
    <>
      <div className={styles.list}>
        {edges.map(story => (
          <ItemStories
            me={me}
            isStoryOwner={userId === story.user.id}
            key={story.id}
            {...story}
          />
        ))}
      </div>
      {edges.length === pageInfo.limit + pageInfo.offset && (
        <Button
          black
          className={styles['load-more-button']}
          onClick={() => {
            loadMoreStories(fetchMore, edges.length)
          }}
        >
          Далее
        </Button>
      )}
    </>
  )
}
export default ListStories
