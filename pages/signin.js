import React from 'react'
import { CenterWrapper, SigninForm } from '../src/components'
function SigninPage({ query }) {
  return (
    <CenterWrapper>
      <SigninForm returnUrl={query.return} />
    </CenterWrapper>
  )
}
export default SigninPage
