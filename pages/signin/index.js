import React from 'react'
import { CenterWrapper } from '../../src/components'
import Form from './form'
function SigninPage({ query }) {
  return (
    <CenterWrapper>
      <Form returnUrl={query.return} />
    </CenterWrapper>
  )
}
export default SigninPage
