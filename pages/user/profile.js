import React from 'react'
import { Query } from 'react-apollo'
import { BigLoader, ErrorMessage, ListStories } from '../../src/components'
import { UserInfo } from '../../src/components/users-info'
import { USER_QUERY, USER_STORIES_QUERY } from '../../src/lib/queries'
function UserProfile({ id }) {
  return (
    <Query query={USER_QUERY} variables={{ id }} partialRefetch>
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage error={error} />
        if (loading) return <BigLoader />
        return (
          <div>
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
          </div>
        )
      }}
    </Query>
  )
}
export default UserProfile
