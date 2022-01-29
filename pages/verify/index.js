import React from 'react'
import { CenterWrapper } from '../../src/components'
import Result from './result'
function VerifyPage({ query }) {
  return (
    <CenterWrapper>
      <Result token={query.verifyToken} />
    </CenterWrapper>
  )
}
export default VerifyPage
