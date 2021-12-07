import gql from 'graphql-tag'
export const VIEW_MUTATION = gql`
  mutation VIEW_MUTATION($id: ID!) {
    viewStory(id: $id) {
      id
    }
  }
`
export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UPDATE_ACCOUNT_MUTATION($username: String!, $info: String) {
    updateUser(username: $username, info: $info) {
      id
      username
      info
    }
  }
`
export const CHECK_USER_EXIST_MUTATION = gql`
  mutation CHECK_USER_EXIST_MUTATION($login: String!) {
    checkUserExist(login: $login)
  }
`
