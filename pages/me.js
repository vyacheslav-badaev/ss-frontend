import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Wrapper } from '../src/components'
import MeInfo from '../src/components/me-info'
import { ME_QUERY } from '../src/lib/queries'
import { checkLoggedIn, redirect } from '../src/lib/helpers'
import styles from '../src/styles/pages/me.css'
class MePage extends Component {
  static async getInitialProps(ctx) {
    const { me } = await checkLoggedIn(ctx.apolloClient)
    if (+me.id < 0) {
      redirect(ctx, '/signin?return=me')
    }
    return { me }
  }
  render() {
    const { me } = this.props
    return (
      <Query
        query={ME_QUERY}
        variables={{
          userId: me.id,
        }}
        partialRefetch
      >
        {({ data, loading, error, fetchMore }) => (
          <Wrapper me={data.me} innerClassName={styles.wrapper}>
            <MeInfo
              me={data.me}
              data={data}
              loading={loading}
              error={error}
              fetchMore={fetchMore}
            />
          </Wrapper>
        )}
      </Query>
    )
  }
}
export default MePage
