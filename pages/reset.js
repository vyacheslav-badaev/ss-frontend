import React from 'react'
import { CenterWrapper } from '../src/components'
import ResetForm from '../src/components/reset-form'
function ResetPage({ query }) {
  return (
    <CenterWrapper>
      <ResetForm token={query.resetToken} />
    </CenterWrapper>
  )
}
export default ResetPage
