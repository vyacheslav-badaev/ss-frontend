import React, { Component } from 'react'
import Editor from './editor'
import { checkLoggedIn, redirect } from '../../src/lib/helpers'
class EditStoryPage extends Component {
  static async getInitialProps(ctx) {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient)
    if (!loggedInUser.me) {
      redirect(ctx, `/signin?return=edit-story?id=${ctx.query.id}`)
    }
    return { loggedInUser }
  }
  render() {
    const { query } = this.props
    return <Editor id={query.id} />
  }
}
export default EditStoryPage
