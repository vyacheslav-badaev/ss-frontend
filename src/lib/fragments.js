import gql from 'graphql-tag'
export const meFragment = gql`
  fragment me on Me {
    id
    username
    email
    isVerified
    photo
    info
  }
`
export const userFragment = gql`
  fragment user on User {
    id
    username
    photo
    info
  }
`
export const storyFragment = gql`
  fragment story on Story {
    id
    title
    body
    length
    genre {
      id
      name
    }
    user {
      ...user
    }
    stats {
      likes {
        id
      }
      dislikes {
        id
      }
      views {
        id
      }
      comments
    }
    createdAt
  }
  ${userFragment}
`
export const storiesFragment = gql`
  fragment stories on StoryConnection {
    edges {
      ...story
    }
    pageInfo {
      offset
      limit
    }
  }
  ${storyFragment}
`
export const reactionFragment = gql`
  fragment reaction on Reaction {
    id
    state
    userId
    storyId
  }
`
export const commentFragment = gql`
  fragment comment on Comment {
    id
    body
    user {
      ...user
    }
    createdAt
  }
  ${userFragment}
`
export const commentsFragment = gql`
  fragment comments on CommentConnection {
    edges {
      ...comment
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  ${commentFragment}
`
