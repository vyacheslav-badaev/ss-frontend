import React from 'react'
import { Wrapper } from '../../src/components'
import Profile from './profile'
function User({ query }) {
  return (
    <Wrapper>
      <Profile id={query.id} />
    </Wrapper>
  )
}
export default User
