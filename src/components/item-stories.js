import React from 'react'
import styled from '@emotion/styled'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import slugify from '@sindresorhus/slugify'
import UserWithDate from './user-with-date'
import { ALL_STORIES_QUERY } from '../lib/queries'
import { DELETE_STORY_MUTATION } from '../lib/mutations'
const AuthorBlock = styled(UserWithDate)`
  .name-with-date {
    .name {
      font-size: 1.4rem;
      line-height: 1;
    }
  }
`
const Wrapper = styled.article`
  cursor: pointer;
  opacity: 0.95;
  height: 450px;
  overflow: hidden;
  background: ${props => props.theme.white};
  padding: 24px;
  border-radius: 8px;
  transform: translateZ(0);
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out,
    opacity 0.2s ease-out;
  transition-delay: 0.1s;
  &:hover {
    opacity: 1;
    transform: translate(0, -4px);
    box-shadow: rgba(45, 45, 45, 0.05) 0px 2px 2px,
      rgba(49, 49, 49, 0.05) 0px 4px 4px, rgba(42, 42, 42, 0.05) 0px 8px 8px,
      rgba(32, 32, 32, 0.05) 0px 16px 16px, rgba(49, 49, 49, 0.05) 0px 32px 32px,
      rgba(35, 35, 35, 0.05) 0px 64px 64px;
  }
  .title {
    margin-bottom: 12px;
    font-size: 1.6rem;
    font-weight: bold;
    font-family: ${props => props.theme.textFont};
    line-height: 1;
  }
  .labels {
    margin: 12px 0;
    .genre,
    .length {
      color: ${props => props.theme.white};
      border-radius: 25px;
      padding: 6px 8px;
      display: inline-block;
      font-weight: 400;
      font-size: 1.2rem;
    }
    .length {
      margin-left: 10px;
    }
    .genre {
      background-color: ${props => props.theme.softViolet};
    }
    .short {
      background-color: #0ab7a6;
    }
    .long {
      background-color: #edc951;
    }
    .middle {
      background-color: #c6a5d8;
    }
  }
  .body {
    font-size: 1.4rem;
    font-family: ${props => props.theme.textFont};
    font-weight: 400;
    line-height: 1.45;
  }
  .edit-and-delete {
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-top: -20px;
    margin-right: -20px;
    margin-left: -20px;
    button {
      background-color: ${props => props.theme.white};
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s ease-in-out;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: ${props => props.theme.lightGrey};
      }
    }
  }
`
const BottomBar = styled.div`
  background: linear-gradient(
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.95),
    #fff
  );
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  padding-top: 64px;
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  .buttons-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 16px;
      img {
        width: 16px;
        height: 16px;
        margin-bottom: 2px;
      }
      span {
        font-size: 1rem;
      }
    }
  }
`
function update(cache, payload) {
  const data = cache.readQuery({ query: ALL_STORIES_QUERY })
  data.stories.edges = data.stories.edges.filter(
    story => story.id !== payload.data.deleteStory.id
  )
  cache.writeQuery({
    query: ALL_STORIES_QUERY,
    data,
  })
}
function getLength(l) {
  if (l >= 1800 && l < 8000) return 'short'
  if (l >= 8000 && l < 25000) return 'middle'
  return 'long'
}
function rus(l) {
  switch (l) {
    case 'short':
      return 'Короткий'
    case 'middle':
      return 'Средний'
    case 'long':
      return 'Длинный'
    default:
      break
  }
}
function StoryItem({
  isStoryOwner = false,
  id,
  user,
  stats,
  createdAt,
  title,
  body,
  genre,
  length,
}) {
  return (
    <Wrapper
      onClick={() => {
        Router.push(`/story?id=${id}`, `/story/${id}-${slugify(title)}`).then(
          () => {
            window.scrollTo(0, 0)
          }
        )
      }}
    >
      {isStoryOwner ? (
        <div className="edit-and-delete">
          <button
            type="button"
            onClick={event => {
              event.stopPropagation()
              Router.push(
                `/edit-story?id=${id}`,
                `/edit-story/${id}-${slugify(title)}`
              ).then(() => {
                window.scrollTo(0, 0)
              })
            }}
          >
            <img src="/static/images/icons/edit.svg" alt="Edit" />
          </button>
          <Mutation
            mutation={DELETE_STORY_MUTATION}
            variables={{ id }}
            update={update}
            optimisticResponse={{
              __typename: 'Mutation',
              deleteStory: {
                __typename: 'Story',
                id,
              },
            }}
          >
            {deleteStory => (
              <button
                type="button"
                onClick={event => {
                  event.stopPropagation()
                  deleteStory()
                }}
              >
                <img src="/static/images/icons/cross.svg" alt="Delete" />
              </button>
            )}
          </Mutation>
        </div>
      ) : (
        <AuthorBlock user={user} date={createdAt} />
      )}
      <div className="labels">
        {genre && <span className="genre">{genre.name}</span>}
        <span className={`length ${getLength(length)}`}>
          {rus(getLength(length))}
        </span>
      </div>
      <h2 className="title">{title}</h2>
      <p className="body">{body}</p>
      <BottomBar>
        <div className="buttons-container">
          <div>
            <img src="/static/images/icons/eye.svg" alt="Просмотры" />
            <span>{stats.views}</span>
          </div>
          <div>
            <img src="/static/images/icons/like-fill-grey.svg" alt="Лайки" />
            <span>{stats.likes}</span>
          </div>
          <div>
            <img
              src="/static/images/icons/dislike-fill-grey.svg"
              alt="Дизлайки"
            />
            <span>{stats.dislikes}</span>
          </div>
          <div>
            <img
              src="/static/images/icons/comment-fill-grey.svg"
              alt="Комменты"
            />
            <span>{stats.comments}</span>
          </div>
        </div>
      </BottomBar>
    </Wrapper>
  )
}
export default StoryItem
