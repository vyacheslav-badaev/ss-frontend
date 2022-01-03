import React from 'react'
import { Wrapper, UserProfile } from '../src/components'
function User({ query }) {
  return (
    <Wrapper>
      <UserProfile id={query.id} />
    </Wrapper>
  )
}
export default User
