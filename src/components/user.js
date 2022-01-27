import React from 'react'
import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../lib/queries'
import ErrorMessage from './error-message'
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => {
      if (payload.error) return <ErrorMessage error={payload.error} />
      return props.children(payload)
    }}
  </Query>
)
export default User
