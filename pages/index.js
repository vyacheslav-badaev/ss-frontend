import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import {
  SettingsSort,
  Wrapper,
  MainStories,
  ErrorMessage,
} from '../src/components'
import { GENRES_QUERY } from '../src/lib/queries'
import { fadeIn } from '../src/shared-styles/animations'
const Modal = dynamic(() => import('../src/components/modal'), { ssr: false })
const SEOBlock = styled.div`
  margin-top: 64px;
  background-color: ${props => props.theme.white};
  text-align: left;
  position: relative;
  flex-basis: 100%;
  width: 100%;
  padding: 5vh 0;
  order: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 2px solid ${props => props.theme.lightGrey};
  .inner {
    width: 100%;
    max-width: 1024px;
    padding: 0 24px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .text {
    flex: 2;
    h1 {
      opacity: 0;
      font-size: 3.6rem;
      line-height: 3.6rem;
      color: ${props => props.theme.black};
      animation: ${fadeIn} 1s ease 0.2s 1 normal forwards running;
    }
    p {
      color: slategrey;
      opacity: 0;
      margin-top: 20px;
      font-size: 1.8rem;
      line-height: 1.3;
      animation: ${fadeIn} 1s ease 0.7s 1 normal forwards running;
    }
    .settings-button {
      text-transform: initial;
      color: ${props => props.theme.softViolet};
      font-weight: 700;
    }
  }
  .write {
    display: block;
    opacity: 0;
    font-size: 10rem;
    animation: ${fadeIn} 1s ease 0.8s 1 normal forwards running;
    flex: 1;
    text-align: center;
    @media (max-width: 750px) {
      display: none;
    }
  }
`
function Home() {
  const [isOpen, setOpen] = useState(false)
  const [sort, setSort] = useState(undefined)
  return (
    <Query query={GENRES_QUERY}>
      {({ data, error }) => {
        if (error) return <ErrorMessage error={error} />
        return (
          <>
            <SEOBlock>
              <div className="inner">
                <div className="text">
                  <h1>Здесь вы можете читать рассказы авторов из народа.</h1>
                  <p>
                    Откройте для себя новых авторов или{' '}
                    <Link href="/create-story">
                      <a>продемонстрируйте</a>
                    </Link>{' '}
                    писательский талант и станьте лучшим.
                  </p>
                  <p>
                    Для удобства чтения{' '}
                    <button
                      onClick={() => {
                        setOpen(true)
                      }}
                      className="settings-button"
                      type="button"
                    >
                      настройте
                    </button>{' '}
                    ленту.
                  </p>
                </div>
                <span className="write" role="img" aria-label="emoji">
                  ✍️
                </span>
              </div>
            </SEOBlock>
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
