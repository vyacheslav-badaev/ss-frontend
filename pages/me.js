import React, { Component } from 'react'
import { Wrapper, Me } from '../src/components'
import { checkLoggedIn, redirect } from '../src/lib/helpers'
class MePage extends Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    if (!loggedInUser.me) {
      redirect(ctx, '/signin?return=me')
    }
    return { loggedInUser }
  }
  render() {
    return (
      <Wrapper>
        <Me />
      </Wrapper>
    )
  }
}
export default MePage
