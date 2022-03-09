import React, { Component } from 'react'
import { Query } from 'react-apollo'
import cookies from 'next-cookies'
import StoryEditor from '../src/components/story-editor'
import { EDIT_STORY_QUERY } from '../src/lib/queries'
import { checkLoggedIn, redirect } from '../src/lib/helpers'
class EditStoryPage extends Component {
  static async getInitialProps(ctx) {
    const { theme } = cookies(ctx)
    const { me } = await checkLoggedIn(ctx.apolloClient)
    if (+me.id < 0) {
      redirect(ctx, '/signin?return=create-story')
    }
    return { me, theme: theme || 'light' }
  }
  render() {
    const { query, me, theme } = this.props
    return (
      <Query query={EDIT_STORY_QUERY} variables={{ id: query.id }}>
        {({ data }) => (
          <StoryEditor
            story={data.story}
            genres={data.genres}
            userId={me.id}
            id={query.id}
            theme={theme}
          />
        )}
      </Query>
    )
  }
}
export default EditStoryPage
