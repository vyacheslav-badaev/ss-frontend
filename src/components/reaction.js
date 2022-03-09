import React from 'react'
import { Mutation } from 'react-apollo'
import cn from 'classnames'
import { storyFragment } from '../lib/fragments'
import { LIKE_MUTATION, DISLIKE_MUTATION } from '../lib/mutations'
import styles from './styles/reaction.css'
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
      update={(cache, mutationResult) => {
        const mutationName = state === 'like' ? 'likeStory' : 'dislikeStory'
        const { userId } = mutationResult.data[mutationName]
        const story = cache.readFragment({
          id: `Story:${id}`,
          fragment: storyFragment,
          fragmentName: 'story',
        })
        const hasLike = story.stats.likes.some(l => l.id === userId)
        const hasDislike = story.stats.dislikes.some(d => d.id === userId)
        let updatedLikes = story.stats.likes
        let updatedDislikes = story.stats.dislikes
        if (state === 'like') {
          if (hasLike && !hasDislike) {
            updatedLikes = story.stats.likes.filter(l => l.id !== userId)
          }
          if (!hasLike && hasDislike) {
            updatedLikes = [
              ...story.stats.likes,
              { id: userId, __typename: 'User' },
            ]
            updatedDislikes = story.stats.dislikes.filter(d => d.id !== userId)
          }
          if (!hasLike && !hasDislike) {
            updatedLikes = [
              ...story.stats.likes,
              { id: userId, __typename: 'User' },
            ]
          }
          cache.writeFragment({
            id: `Story:${id}`,
            fragment: storyFragment,
            fragmentName: 'story',
            data: {
              ...story,
              stats: {
                ...story.stats,
                likes: updatedLikes,
                dislikes: updatedDislikes,
              },
            },
          })
          return
        }
        if (hasDislike && !hasLike) {
          updatedDislikes = story.stats.dislikes.filter(l => l.id !== userId)
        }
        if (!hasDislike && hasLike) {
          updatedDislikes = [
            ...story.stats.dislikes,
            { id: userId, __typename: 'User' },
          ]
          updatedLikes = story.stats.likes.filter(l => l.id !== userId)
        }
        if (!hasDislike && !hasLike) {
          updatedDislikes = [
            ...story.stats.dislikes,
            { id: userId, __typename: 'User' },
          ]
        }
        cache.writeFragment({
          id: `Story:${id}`,
          fragment: storyFragment,
          fragmentName: 'story',
          data: {
            ...story,
            stats: {
              ...story.stats,
              likes: updatedLikes,
              dislikes: updatedDislikes,
            },
          },
        })
      }}
    >
      {mutate => (
        <div className={cn(styles['reaction-button'], { [styles.dark]: dark })}>
          <button
            type="button"
            onClick={() => {
              mutate()
            }}
          >
            <img src={getIcon()} alt={state} />
          </button>
          <span>{qty}</span>
        </div>
      )}
    </Mutation>
  )
}
export default Reaction
