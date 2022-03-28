import gql from 'graphql-tag'
import {
  meFragment,
  storiesFragment,
  userFragment,
  storyFragment,
  commentsFragment,
} from './fragments'
export const INDEX_QUERY = gql`
  query INDEX_QUERY(
    $offset: Int = 0
    $limit: Int = 8
    $userId: ID = null
    $isLiked: Boolean = false
    $length: String
    $genres: [ID]
    $mostLiked: Boolean = false
    $mostViewed: Boolean = false
    $mostCommented: Boolean = false
  ) {
    me {
      ...me
    }
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
        key: "IndexStoriesConnection"
        filter: ["length", "genres", "mostLiked", "mostViewed", "mostCommented"]
      ) {
      ...stories
    }
    genres {
      id
      name
    }
  }
  ${meFragment}
  ${storiesFragment}
`
export const ME_QUERY = gql`
  query ME_QUERY($offset: Int = 0, $limit: Int = 8, $userId: ID) {
    me {
      ...me
    }
    writtenStories: stories(
      offset: $offset
      limit: $limit
      userId: $userId
      isLiked: false
    )
      @connection(
        key: "WrittenStoriesConnection"
        filter: ["userId", "isLiked"]
      ) {
      ...stories
    }
    favStories: stories(offset: $offset, limit: $limit, isLiked: true)
      @connection(key: "LikedStoriesConnection", filter: ["isLiked"]) {
      ...stories
    }
  }
  ${meFragment}
  ${storiesFragment}
`
export const EDIT_STORY_QUERY = gql`
  query EDIT_STORY_QUERY($id: ID!) {
    story(id: $id) {
      ...story
    }
    genres {
      id
      name
    }
  }
  ${storyFragment}
`
export const USER_QUERY = gql`
  query USER_QUERY($id: ID!, $offset: Int = 0, $limit: Int = 8) {
    me {
      ...me
    }
    user(id: $id) {
      ...user
    }
    stories(offset: $offset, limit: $limit, userId: $id)
      @connection(key: "UserStoriesConnection", filter: ["userId"]) {
      ...stories
    }
  }
  ${meFragment}
  ${userFragment}
  ${storiesFragment}
`
export const STORY_QUERY = gql`
  query STORY_QUERY($id: ID!, $cursor: String, $limit: Int) {
    me {
      ...me
    }
    story(id: $id) {
      ...story
    }
    comments(cursor: $cursor, limit: $limit, storyId: $id)
      @connection(key: "CommentConnection", filter: ["storyId"]) {
      ...comments
    }
  }
  ${meFragment}
  ${storyFragment}
  ${commentsFragment}
`
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
      ...me
    }
  }
  ${meFragment}
`
