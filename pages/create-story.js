import React, { Component } from 'react'
import { StoryCreator } from '../src/components'
import { checkLoggedIn, redirect } from '../src/lib/helpers'
class CreateStoryPage extends Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    if (!loggedInUser.me) {
      redirect(ctx, '/signin?return=create-story')
    }
    return { loggedInUser }
  }
  render() {
    return <StoryCreator />
  }
}
export default CreateStoryPage
