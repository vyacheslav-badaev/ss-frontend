import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import {
  User,
  BigLoader,
  ErrorMessage,
  ListStories,
} from '../../src/components'
import { AccountInfo, AccountEdit } from '../../src/components/users-info'
import {
  WRITTEN_STORIES_QUERY,
  LIKED_STORIES_QUERY,
} from '../../src/lib/queries'
const Tabs = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid rgb(255, 255, 255, 0.2);
  button[role='tab'] {
    opacity: 0.8;
    position: relative;
    display: inline-block;
    padding-bottom: 8px;
    margin-right: 20px;
    color: ${props => props.theme.white};
    font-size: 1.4rem;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 1;
    }
    &.active {
      opacity: 1;
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        border-bottom: 2px solid rgb(255, 255, 255, 0.8);
        bottom: 0;
        left: 0;
      }
    }
  }
`
function Info() {
  const [tab, setTab] = useState('written')
  const [isEdit, setEdit] = useState(false)
  function renderStories(me, loading, error, stories, fetchMore) {
    if (loading || !stories) return <BigLoader />
    if (error) return <ErrorMessage error={error} />
    return !stories.edges.length ? (
      <p>Нет рассказов</p>
    ) : (
      <ListStories
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
            <div>
              {isEdit ? (
                <AccountEdit me={me} setEdit={setEdit} />
              ) : (
                <AccountInfo me={me} setEdit={setEdit} />
              )}
              <Tabs>
                <button
                  className={tab === 'written' ? 'active' : ''}
                  type="button"
                  role="tab"
                  onClick={() => {
                    setTab('written')
                  }}
                >
                  Написанные
                </button>
                <button
                  className={tab === 'favs' ? 'active' : ''}
                  type="button"
                  role="tab"
                  onClick={() => {
                    setTab('favs')
                  }}
                >
                  Понравившиеся
                </button>
              </Tabs>
              {renderStories(me, loading, error, stories, fetchMore)}
            </div>
          )}
        </Query>
      )}
    </User>
  )
}
export default Info
