import React from 'react'
import { Query } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../lib/queries'
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload || { data: { me: null } })}
  </Query>
)
export default User
