import React, { useState } from 'react'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import User from './User'
import BigLoader from './BigLoader'
import { AccountInfo, AccountEdit } from './users-info'
import StoriesGrid from './StoriesGrid'
import Error from './ErrorMessage'
import { WRITTEN_STORIES_QUERY, LIKED_STORIES_QUERY } from '../lib/queries'
const toWritten = keyframes`
  from {
    left: 85px;
  }
  to {
    left: 0px;
  }
`
const toLiked = keyframes`
  from {
    left: 0px;
  }
  to {
    left: 85px;
  }
`
const AccountStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  > p {
    color: ${props => props.theme.white};
  }
  nav {
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
    margin-bottom: 20px;
    ul {
      margin: 0;
      padding: 0;
      margin-bottom: -1px;
      white-space: nowrap;
      list-style-type: none;
      li {
        position: relative;
        display: inline-block;
        padding-bottom: 8px;
        margin-right: 20px;
        width: 65px;
        button {
          text-transform: initial;
          outline: none;
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
          color: ${props => props.theme.white};
          font-size: 1.6rem;
          font-weight: bold;
          background: transparent;
        }
        &:first-of-type::after {
          content: '';
          position: absolute;
          width: 100%;
          border-bottom: 2px solid rgb(255, 255, 255, 0.8);
          bottom: 0;
        }
      }
      .written {
        button {
          opacity: 1;
        }
        &::after {
          left: 0;
          animation: ${toWritten} 0.25s ease;
        }
      }
      .favs {
        button {
          opacity: 1;
        }
        &::after {
          left: 85px;
          animation: ${toLiked} 0.25s ease;
        }
      }
    }
  }
`
function Account() {
  const [tab, setTab] = useState('written')
  const [isEdit, setEdit] = useState(false)
  function renderStories(me, loading, error, stories, fetchMore) {
    if (loading || !stories) return <BigLoader />
    if (error) return <Error error={error} />
    return !stories.edges.length ? (
      <p>Нет рассказов</p>
    ) : (
      <StoriesGrid
        {...stories}
        userId={tab === 'written' ? me.id : null}
        fetchMore={fetchMore}
      />
    )
  }
  return (
    <User>
      {({ data: { me } }) => (
        <Query
          query={
            tab === 'written' ? WRITTEN_STORIES_QUERY : LIKED_STORIES_QUERY
          }
          variables={tab === 'written' && me ? { userId: me.id } : undefined}
        >
          {({ data: { stories }, loading, error, fetchMore }) => (
            <>
              <AccountStyles>
                {isEdit ? (
                  <AccountEdit me={me} setEdit={setEdit} />
                ) : (
                  <AccountInfo me={me} setEdit={setEdit} />
                )}
                <nav>
                  <ul>
                    <li className={tab}>
                      <span>
                        <button
                          type="button"
                          role="tab"
                          onClick={() => {
                            setTab('written')
                          }}
                        >
                          Written
                        </button>
                      </span>
                    </li>
                    <li className={tab === 'favs' ? 'active' : ''}>
                      <span>
                        <button
                          type="button"
                          role="tab"
                          onClick={() => {
                            setTab('favs')
                          }}
                        >
                          Favs
                        </button>
                      </span>
                    </li>
                  </ul>
                </nav>
                {renderStories(me, loading, error, stories, fetchMore)}
              </AccountStyles>
            </>
          )}
        </Query>
      )}
    </User>
  )
}
export default Account
