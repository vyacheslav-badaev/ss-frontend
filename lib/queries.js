import gql from 'graphql-tag'
export const GENRES_QUERY = gql`
  query GENRES_QUERY {
    genres {
      id
      name
    }
  }
`
export const CHECK_LOGGED_IN_QUERY = gql`
  query CHECK_LOGGED_IN_QUERY {
    me {
      id
    }
  }
`
export const WRITTEN_STORIES_QUERY = gql`
  query WRITTEN_STORIES_QUERY($offset: Int = 0, $limit: Int = 20, $userId: ID) {
    stories(offset: $offset, limit: $limit, userId: $userId, isLiked: false)
      @connection(key: "WrittenStoriesConnection") {
      edges {
        id
        title
        body
        length
        user {
          ...author
        }
        genre {
          id
          name
        }
        stats {
          likes
          dislikes
          comments
          views
        }
        createdAt
      }
      pageInfo {
        offset
        limit
      }
    }
  }
  fragment author on User {
    id
    username
    photo
  }
`
export const LIKED_STORIES_QUERY = gql`
  query LIKED_STORIES_QUERY($offset: Int = 0, $limit: Int = 20) {
    stories(offset: $offset, limit: $limit, userId: null, isLiked: true)
      @connection(key: "LikedStoriesConnection") {
      edges {
        id
        title
        body
        length
        user {
          ...author
        }
        genre {
          id
          name
        }
        stats {
          likes
          dislikes
          comments
          views
        }
        createdAt
      }
      pageInfo {
        offset
        limit
      }
    }
  }
  fragment author on User {
    id
    username
    photo
  }
`
export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      username
      email
      isVerified
      photo
    }
  }
`
