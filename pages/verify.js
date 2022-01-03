import React from 'react'
import { CenterWrapper, VerifyBlock } from '../src/components'
function VerifyPage({ query }) {
  return (
    <CenterWrapper>
      <VerifyBlock token={query.verifyToken} />
    </CenterWrapper>
  )
}
export default VerifyPage
