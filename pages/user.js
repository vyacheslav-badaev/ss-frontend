import React from 'react'
import { Query } from 'react-apollo'
import { Wrapper } from '../src/components'
import UserProfile from '../src/components/user-profile'
import { USER_QUERY } from '../src/lib/queries'
import styles from '../src/styles/pages/user.css'
function User({ query }) {
  return (
    <Query query={USER_QUERY} variables={{ id: query.id }} partialRefetch>
      {({ data, loading, error, fetchMore }) => (
        <Wrapper me={data.me} innerClassName={styles.wrapper}>
          <UserProfile
            me={data.me}
            user={data.user}
            stories={data.stories}
            fetchMore={fetchMore}
            loading={loading}
            error={error}
          />
        </Wrapper>
      )}
    </Query>
  )
}
export default User
