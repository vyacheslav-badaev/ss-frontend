import gql from 'graphql-tag'
import { meFragment, commentFragment, storyFragment } from './fragments'
export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UPDATE_ACCOUNT_MUTATION($username: String!, $info: String) {
    updateUser(username: $username, info: $info) {
      ...me
    }
  }
  ${meFragment}
`
export const POST_PHOTO_MUTATION = gql`
  mutation POST_PHOTO_MUTATION(
    $file: Upload!
    $width: Float!
    $height: Float!
    $x: Float!
    $y: Float!
  ) {
    postPhoto(file: $file, width: $width, height: $height, x: $x, y: $y) {
      photo
    }
  }
`
export const CHECK_USER_EXIST_MUTATION = gql`
  mutation CHECK_USER_EXIST_MUTATION($login: String!) {
    checkUserExist(login: $login)
  }
`
export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      ...me
    }
  }
  ${meFragment}
`
export const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signUp(username: $username, email: $email, password: $password) {
      ...me
    }
  }
  ${meFragment}
`
export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($login: String!) {
    requestReset(login: $login) {
      email
    }
  }
`
export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $token: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      ...me
    }
  }
  ${meFragment}
`
export const VERIFY_MUTATION = gql`
  mutation VERIFY_MUTATION($token: String!) {
    verifyUser(token: $token) {
      ...me
    }
  }
  ${meFragment}
`
export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`
export const LIKE_MUTATION = gql`
  mutation LIKE_MUTATION($id: ID!) {
    likeStory(id: $id) {
      id
      state
      userId
      storyId
    }
  }
`
export const DISLIKE_MUTATION = gql`
  mutation DISLIKE_MUTATION($id: ID!) {
    dislikeStory(id: $id) {
      id
      state
      userId
      storyId
    }
  }
`
export const CREATE_STORY_MUTATION = gql`
  mutation CREATE_STORY_MUTATION(
    $title: String!
    $body: String!
    $genreId: ID!
  ) {
    createStory(title: $title, body: $body, genreId: $genreId) {
      ...story
    }
  }
  ${storyFragment}
`
export const EDIT_STORY_MUTATION = gql`
  mutation EDIT_STORY_MUTATION(
    $id: ID!
    $body: String!
    $title: String!
    $genreId: ID!
  ) {
    updateStory(id: $id, body: $body, title: $title, genreId: $genreId) {
      id
      title
      body
    }
  }
`
export const DELETE_STORY_MUTATION = gql`
  mutation DELETE_STORY_MUTATION($id: ID!) {
    deleteStory(id: $id) {
      id
    }
  }
`
export const VIEW_STORY_MUTATION = gql`
  mutation VIEW_STORY_MUTATION($id: ID!) {
    viewStory(id: $id) {
      id
      userId
      storyId
    }
  }
`
export const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($id: ID!, $body: String!, $commentId: ID) {
    createComment(id: $id, body: $body, commentId: $commentId) {
      ...comment
    }
  }
  ${commentFragment}
`
export const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION(
    $id: ID!
    $hasChildren: Boolean!
    $commentId: ID
  ) {
    deleteComment(id: $id, hasChildren: $hasChildren, commentId: $commentId) {
      id
    }
  }
`
export const UPDATE_COMMENT_MUTATION = gql`
  mutation UPDATE_COMMENT_MUTATION($id: ID!, $body: String!) {
    updateComment(id: $id, body: $body) {
      ...comment
    }
  }
  ${commentFragment}
`
