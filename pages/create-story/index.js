import React, { Component } from 'react'
import Creator from './creator'
import { checkLoggedIn, redirect } from '../../src/lib/helpers'
class CreateStoryPage extends Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    if (!loggedInUser.me) {
      redirect(ctx, '/signin?return=create-story')
    }
    return { loggedInUser }
  }
  render() {
    return <Creator userId={this.props.loggedInUser.me.id} />
  }
}
export default CreateStoryPage
