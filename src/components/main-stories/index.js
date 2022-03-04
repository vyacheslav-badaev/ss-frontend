import React from 'react'
import { Query } from 'react-apollo'
import ListStories from '../list-stories'
import BigLoader from '../big-loader'
import ErrorMessage from '../error-message'
import { ALL_STORIES_QUERY } from '../../lib/queries'
import styles from './styles.css'
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
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <BigLoader />
        if (error) return <ErrorMessage error={error} />
        if (!data.stories.edges.length)
          return (
            <div>
              <h2 className={styles['no-stories']}>Нет рассказов :(</h2>
            </div>
          )
        return (
          <ListStories {...data.stories} me={data.me} fetchMore={fetchMore} />
        )
      }}
    </Query>
  )
}
export default MainStories
