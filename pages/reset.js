import React from 'react'
import { CenterWrapper, ResetPasswordForm } from '../src/components'
function ResetPage({ query }) {
  return (
    <CenterWrapper>
      <ResetPasswordForm token={query.resetToken} />
    </CenterWrapper>
  )
}
export default ResetPage
