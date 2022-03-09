import React from 'react'
import { CenterWrapper } from '../src/components'
import SigninForm from '../src/components/signin-form'
function SigninPage({ query }) {
  return (
    <CenterWrapper>
      <SigninForm returnUrl={query.return} />
    </CenterWrapper>
  )
}
export default SigninPage
