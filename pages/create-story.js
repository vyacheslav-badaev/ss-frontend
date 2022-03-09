import React, { Component } from 'react'
import cookies from 'next-cookies'
import StoryCreator from '../src/components/story-creator'
import { checkLoggedIn, redirect } from '../src/lib/helpers'
class CreateStoryPage extends Component {
  static async getInitialProps(ctx) {
    const { theme } = cookies(ctx)
    const { me } = await checkLoggedIn(ctx.apolloClient)
    if (+me.id < 0) {
      redirect(ctx, '/signin?return=create-story')
    }
    return { me, theme: theme || 'light' }
  }
  render() {
    const { me, theme } = this.props
    return <StoryCreator userId={me.id} theme={theme} />
  }
}
export default CreateStoryPage
