import React from 'react'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import { BigLoader, ErrorMessage, ListStories } from '.'
import { UserInfo } from './users-info'
import { USER_QUERY, USER_STORIES_QUERY } from '../lib/queries'
const UserProfileStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
function UserProfile({ id }) {
  return (
    <Query query={USER_QUERY} variables={{ id }} partialRefetch>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage error={error} />
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
                if (error) return <ErrorMessage error={error} />
                return !stories.edges.length ? (
                  <p>Нет рассказов :(</p>
                ) : (
                  <ListStories {...stories} fetchMore={fetchMore} />
                )
              }}
            </Query>
          </UserProfileStyles>
        )
      }}
    </Query>
  )
}
export default UserProfile
