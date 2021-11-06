import React, { Component } from 'react'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import ReactModal from 'react-modal'
import { Query } from 'react-apollo'
import User from './User'
import DropAndCrop from './DropAndCrop'
import BigLoader from './BigLoader'
import StoriesGrid from './StoriesGrid'
import Error from './ErrorMessage'
import getPhoto from '../lib/get-photo'
import { WRITTEN_STORIES_QUERY, LIKED_STORIES_QUERY } from '../lib/queries'
import MeInfo from './me-info'
const UserInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.white};
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 20px;
  .username {
    color: ${props => props.theme.black};
    font-size: 2rem;
    margin: 10px 0;
  }
  .email {
    color: ${props => props.theme.black};
    font-size: 2rem;
    margin-bottom: 20px;
  }
`
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
    margin-bottom: 50px;
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
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    border: 'none',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 999,
  },
  body: {
    overflowY: 'hidden',
  },
}
if (process.browser) {
  ReactModal.setAppElement('#__next')
}
class Account extends Component {
  state = {
    activeTab: 'written',
    isOpen: false,
  }
  openModal = () => {
    this.setState({
      isOpen: true,
    })
  }
  closeModal = () => {
    this.setState({
      isOpen: false,
    })
  }
  changeTab = tab => {
    this.setState({
      activeTab: tab,
    })
  }
  renderStories = (me, loading, error, stories, fetchMore) => {
    const { activeTab } = this.state
    if (loading || !stories) return <BigLoader />
    if (error) return <Error error={error} />
    return !stories.edges.length ? (
      <p>Нет рассказов</p>
    ) : (
      <StoriesGrid
        {...stories}
        userId={activeTab === 'written' ? me.id : null}
        fetchMore={fetchMore}
      />
    )
  }
  render() {
    const { activeTab, isOpen } = this.state
    return (
      <User>
        {({ data: { me } }) => (
          <Query
            query={
              activeTab === 'written'
                ? WRITTEN_STORIES_QUERY
                : LIKED_STORIES_QUERY
            }
            variables={
              activeTab === 'written' && me ? { userId: me.id } : undefined
            }
          >
            {({ data: { stories }, loading, error, fetchMore }) => (
              <>
                <AccountStyles>
                  <MeInfo me={me} />
                  {}
                  <nav>
                    <ul>
                      <li className={activeTab}>
                        <span>
                          <button
                            type="button"
                            role="tab"
                            onClick={() => {
                              this.changeTab('written')
                            }}
                          >
                            Written
                          </button>
                        </span>
                      </li>
                      <li className={activeTab === 'favs' ? 'active' : ''}>
                        <span>
                          <button
                            type="button"
                            role="tab"
                            onClick={() => {
                              this.changeTab('favs')
                            }}
                          >
                            Favs
                          </button>
                        </span>
                      </li>
                    </ul>
                  </nav>
                  {this.renderStories(me, loading, error, stories, fetchMore)}
                </AccountStyles>
                {isOpen && (
                  <ReactModal
                    onRequestClose={this.closeModal}
                    isOpen={isOpen}
                    style={customStyles}
                  >
                    <DropAndCrop userId={me.id} afterSave={this.closeModal} />
                  </ReactModal>
                )}
              </>
            )}
          </Query>
        )}
      </User>
    )
  }
}
export default Account
