import React from 'react'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import BigLoader from './BigLoader'
import StoriesGrid from './StoriesGrid'
import ErrorMessage from './ErrorMessage'
export const STORIES_QUERY = gql`
  query STORIES_QUERY(
    $cursor: String
    $limit: Int
    $userId: ID
    $isLiked: Boolean
    $length: String
    $genres: [ID]
    $mostLiked: Boolean = false
    $mostViewed: Boolean = false
    $mostCommented: Boolean = false
  ) {
    stories(
      cursor: $cursor
      limit: $limit
      userId: $userId
      isLiked: $isLiked
      length: $length
      genres: $genres
      mostLiked: $mostLiked
      mostViewed: $mostViewed
      mostCommented: $mostCommented
    )
      @connection(
        key: "AllStoriesConnection"
        filter: ["length", "genres", "mostLiked", "mostViewed", "mostCommented"]
      ) {
      edges {
        id
        title
        body
        length
        genre {
          id
          name
        }
        user {
          ...author
        }
        stats {
          likes
          dislikes
          comments
          views
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  fragment author on User {
    id
    username
    photo
  }
`
const NoStories = styled.div`
  h2 {
    color: ${props => props.theme.white};
  }
  a {
    position: relative;
    color: ${props => props.theme.yellow};
    &::after {
      content: '';
      border-bottom: 3px solid ${props => props.theme.yellow};
      position: absolute;
      width: 0%;
      bottom: -1px;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
    }
    &:hover::after {
      width: 100%;
    }
  }
`
function Stories(props) {
  const { sort = { genres: [], length: null, popular: null } } = props
  const { genres, length, popular } = sort
  const mostLiked = popular === 'mostLiked'
  const mostViewed = popular === 'mostViewed'
  const mostCommented = popular === 'mostCommented'
  return (
    <Query
      query={STORIES_QUERY}
      variables={{ genres, length, mostLiked, mostViewed, mostCommented }}
    >
      {({ data: { stories }, loading, error, fetchMore }) => {
        if (loading) return <BigLoader />
        if (error) return <ErrorMessage error={error} />
        if (!stories.edges.length)
          return (
            <NoStories>
              <h2>Нет историй, попробуйте изменить настройки ленты :(</h2>
            </NoStories>
          )
        return <StoriesGrid {...stories} fetchMore={fetchMore} />
      }}
    </Query>
  )
}
export default Stories
