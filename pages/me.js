import React, { Component } from 'react'
import Wrapper from '../components/Wrapper'
import Account from '../components/Account'
import checkLoggedIn from '../lib/check-logged-in'
import redirect from '../lib/redirect'
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
        <Account />
      </Wrapper>
    )
  }
}
export default MePage
