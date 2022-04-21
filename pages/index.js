import React, { useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { Query } from 'react-apollo'
import { Wrapper, MainStories, SettingsSort, Modal } from '../src/components'
import { INDEX_QUERY } from '../src/lib/queries'
import styles from '../src/styles/pages/index.css'
function IndexPage() {
  const [isOpen, setOpen] = useState(false)
  const [sort, setSort] = useState({
    genres: [],
    length: null,
    popular: null,
  })
  const { popular } = sort
  const mostLiked = popular === 'mostLiked'
  const mostViewed = popular === 'mostViewed'
  const mostCommented = popular === 'mostCommented'
  const variables = {
    genres: sort.genres,
    length: sort.length,
    mostLiked,
    mostViewed,
    mostCommented,
  }
  return (
    <>
      <div className={styles['seo-block']}>
        <div className={styles.inner}>
          <div className={styles.text}>
            <h1>Здесь вы можете читать рассказы свободных писателей</h1>
            <p>
              Откройте для себя новых авторов или{' '}
              <Link href="/create-story">
                <a className={styles.link}>продемонстрируйте</a>
              </Link>{' '}
              талант и станьте лучшим
            </p>
            <p>
              Для удобства чтения{' '}
              <button
                onClick={() => {
                  setOpen(true)
                }}
                className={cn(styles['settings-button'], styles.link)}
                type="button"
              >
                настройте
              </button>{' '}
              ленту
            </p>
          </div>
          <div className={styles.writer}>
            <Link href="/create-story">
              <a>
                <img src="/static/images/writer.svg" alt="" />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Query query={INDEX_QUERY} variables={variables} partialRefetch>
        {({ data: { me, stories, genres }, loading, error, fetchMore }) => (
          <>
            <Wrapper me={me} isIndex>
              <MainStories
                me={me}
                stories={stories}
                loading={loading}
                error={error}
                fetchMore={fetchMore}
              />
            </Wrapper>
            {isOpen && (
              <Modal
                onClose={() => {
                  setOpen(false)
                }}
              >
                <SettingsSort
                  genres={genres}
                  setOpen={setOpen}
                  setSort={setSort}
                />
              </Modal>
            )}
          </>
        )}
      </Query>
    </>
  )
}
export default IndexPage
