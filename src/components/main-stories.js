import React from 'react'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import ListStories from './list-stories'
import BigLoader from './big-loader'
import ErrorMessage from './error-message'
import { ALL_STORIES_QUERY } from '../lib/queries'
const NoStories = styled.div`
  h2 {
    color: ${props => props.theme.white};
  }
`
function MainStories(props) {
  const { sort = { genres: [], length: null, popular: null } } = props
  const { genres, length, popular } = sort
  const mostLiked = popular === 'mostLiked'
  const mostViewed = popular === 'mostViewed'
  const mostCommented = popular === 'mostCommented'
  const variables = {
    genres,
    length,
    mostLiked,
    mostViewed,
    mostCommented,
  }
  return (
    <Query query={ALL_STORIES_QUERY} variables={variables}>
      {({ data: { stories }, loading, error, fetchMore }) => {
        if (loading) return <BigLoader />
        if (error) return <ErrorMessage error={error} />
        if (!stories.edges.length)
          return (
            <NoStories>
              <h2>Нет рассказов :(</h2>
            </NoStories>
          )
        return <ListStories {...stories} fetchMore={fetchMore} />
      }}
    </Query>
  )
}
export default MainStories
