import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      username
      email
      isVerified
      photo
      info
    }
  }
`
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload || { data: { me: null } })}
  </Query>
)
User.propTypes = {
  children: PropTypes.node.isRequired,
}
export default User
export { CURRENT_USER_QUERY }
