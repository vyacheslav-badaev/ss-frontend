import gql from 'graphql-tag'
const authorFragment = gql`
  fragment author on User {
    id
    username
    photo
    info
  }
`
const storyFragment = gql`
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
      ...author
    }
    stats {
      likes
      dislikes
      comments
      views
    }
    createdAt
  }
  ${authorFragment}
`
export const CURRENT_USER_QUERY = gql`
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
export const STORY_DATA_QUERY = gql`
  query STORY_DATA_QUERY($id: ID!, $cursor: String, $limit: Int) {
    story(id: $id) {
      ...story
    }
    reactions(storyId: $id) {
      id
      state
      userId
      storyId
    }
    comments(cursor: $cursor, limit: $limit, storyId: $id)
      @connection(key: "CommentsConnection", filter: ["storyId"]) {
      edges {
        id
        body
        user {
          ...author
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${storyFragment}
  ${authorFragment}
`
export const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      username
      photo
      info
    }
  }
`
export const ALL_STORIES_QUERY = gql`
  query ALL_STORIES_QUERY(
    $offset: Int = 0
    $limit: Int = 20
    $userId: ID
    $isLiked: Boolean
    $length: String
    $genres: [ID]
    $mostLiked: Boolean = false
    $mostViewed: Boolean = false
    $mostCommented: Boolean = false
  ) {
    stories(
      offset: $offset
      limit: $limit
      userId: $userId
      isLiked: $isLiked
      length: $length
      genres: $genres
      mostLiked: $mostLiked
      mostViewed: $mostViewed
      mostCommented: $mostCommented
    )
      @connection(
        key: "AllStoriesConnection"
        filter: ["length", "genres", "mostLiked", "mostViewed", "mostCommented"]
      ) {
      edges {
        ...story
      }
      pageInfo {
        offset
        limit
      }
    }
  }
  ${storyFragment}
  ${authorFragment}
`
export const GENRES_QUERY = gql`
  query GENRES_QUERY {
    genres {
      id
      name
    }
  }
`
export const WRITTEN_STORIES_QUERY = gql`
  query WRITTEN_STORIES_QUERY($offset: Int = 0, $limit: Int = 20, $userId: ID) {
    stories(offset: $offset, limit: $limit, userId: $userId, isLiked: false)
      @connection(key: "WrittenStoriesConnection") {
      edges {
        ...story
      }
      pageInfo {
        offset
        limit
      }
    }
  }
  ${storyFragment}
`
export const LIKED_STORIES_QUERY = gql`
  query LIKED_STORIES_QUERY($offset: Int = 0, $limit: Int = 20) {
    stories(offset: $offset, limit: $limit, userId: null, isLiked: true)
      @connection(key: "LikedStoriesConnection") {
      edges {
        ...story
      }
      pageInfo {
        offset
        limit
      }
    }
  }
  ${storyFragment}
`
export const USER_STORIES_QUERY = gql`
  query USER_STORIES_QUERY(
    $offset: Int = 0
    $limit: Int = 20
    $userId: ID
    $isLiked: Boolean
  ) {
    stories(offset: $offset, limit: $limit, userId: $userId, isLiked: $isLiked)
      @connection(key: "UserStoriesConnection", filter: ["userId"]) {
      edges {
        ...story
      }
      pageInfo {
        offset
        limit
      }
    }
  }
  ${storyFragment}
`
export const CHECK_LOGGED_IN_QUERY = gql`
  query CHECK_LOGGED_IN_QUERY {
    me {
      id
    }
  }
`
