import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Query } from 'react-apollo'
import {
  SettingsSort,
  Wrapper,
  MainStories,
  ErrorMessage,
} from '../src/components'
import { GENRES_QUERY } from '../src/lib/queries'
import styles from '../src/shared-styles/index-page.css'
const Modal = dynamic(() => import('../src/components/modal'), { ssr: false })
function Home() {
  const [isOpen, setOpen] = useState(false)
  const [sort, setSort] = useState(undefined)
  return (
    <Query query={GENRES_QUERY}>
      {({ data, error }) => {
        if (error) return <ErrorMessage error={error} />
        return (
          <>
            <div className={styles['seo-block']}>
              <div className={styles.inner}>
                <div className={styles.text}>
                  <h1>Здесь вы можете читать рассказы свободных писателей.</h1>
                  <p>
                    Откройте для себя новых авторов или{' '}
                    <Link href="/create-story">
                      <a>продемонстрируйте</a>
                    </Link>{' '}
                    талант и станьте лучшим.
                  </p>
                  <p>
                    Для удобства чтения{' '}
                    <button
                      onClick={() => {
                        setOpen(true)
                      }}
                      className={styles['settings-button']}
                      type="button"
                    >
                      настройте
                    </button>{' '}
                    ленту.
                  </p>
                </div>
                <span className={styles.write} role="img" aria-label="emoji">
                  ✍️
                </span>
              </div>
            </div>
            <Wrapper isIndex>
              <MainStories sort={sort} />
            </Wrapper>
            {isOpen && (
              <Modal
                onClose={() => {
                  setOpen(false)
                }}
              >
                <SettingsSort
                  genres={data.genres}
                  setOpen={setOpen}
                  setSort={setSort}
                />
              </Modal>
            )}
          </>
        )
      }}
    </Query>
  )
}
export default Home
