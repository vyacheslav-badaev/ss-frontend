import React from 'react'
import { CenterWrapper } from '../src/components'
import Verify from '../src/components/verify'
function VerifyPage({ query }) {
  return (
    <CenterWrapper>
      <Verify token={query.verifyToken} />
    </CenterWrapper>
  )
}
export default VerifyPage
