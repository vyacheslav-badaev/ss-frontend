import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { CenterWrapper } from '../src/components'
import Verify from '../src/components/verify'
import { ONLY_ME_QUERY } from '../src/lib/queries'
class VerifyPage extends Component {
  render() {
    const { query } = this.props
    return (
      <Query query={ONLY_ME_QUERY}>
        {({ data }) => (
          <CenterWrapper>
            <Verify me={data.me} token={query.verifyToken} />
          </CenterWrapper>
        )}
      </Query>
    )
  }
}
export default VerifyPage
