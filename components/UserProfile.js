import React from 'react'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import BigLoader from './BigLoader'
import Error from './ErrorMessage'
import StoriesGrid from './StoriesGrid'
import { UserInfo } from './users-info'
const USER_STORIES_QUERY = gql`
  query USER_STORIES_QUERY(
    $cursor: String
    $limit: Int
    $userId: ID
    $isLiked: Boolean
  ) {
    stories(cursor: $cursor, limit: $limit, userId: $userId, isLiked: $isLiked)
      @connection(key: "UserStoriesConnection", filter: ["userId"]) {
      edges {
        id
        title
        body
        length
        user {
          ...author
        }
        genre {
          id
          name
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
    info
  }
`
export const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      username
      photo
      info
    }
  }
`
const UserProfileStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
function UserProfile({ id }) {
  return (
    <Query query={USER_QUERY} variables={{ id }} partialRefetch>
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <BigLoader />
        return (
          <UserProfileStyles>
            <UserInfo user={data.user} />
            <Query query={USER_STORIES_QUERY} variables={{ userId: id }}>
              {({
                data: { stories },
                loading: storyLoading,
                error,
                fetchMore,
              }) => {
                if (storyLoading) return <BigLoader />
                if (error) return <Error error={error} />
                return !stories.edges.length ? (
                  <p>Нет рассказов</p>
                ) : (
                  <StoriesGrid {...stories} fetchMore={fetchMore} />
                )
              }}
            </Query>
          </UserProfileStyles>
        )
      }}
    </Query>
  )
}
UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
}
export default UserProfile
