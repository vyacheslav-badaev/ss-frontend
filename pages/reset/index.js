import React from 'react'
import { CenterWrapper } from '../../src/components'
import Form from './form'
function ResetPage({ query }) {
  return (
    <CenterWrapper>
      <Form token={query.resetToken} />
    </CenterWrapper>
  )
}
export default ResetPage
