import React, { Component } from 'react'
import { Wrapper } from '../../src/components'
import Info from './info'
import { checkLoggedIn, redirect } from '../../src/lib/helpers'
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
        <Info />
      </Wrapper>
    )
  }
}
export default MePage
