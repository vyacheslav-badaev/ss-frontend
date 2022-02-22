import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Head from 'next/head'
import { Query } from 'react-apollo'
import cn from 'classnames'
import withDarkMode from '../../src/hoc/with-dark-mode'
import {
  ErrorMessage,
  User,
  UserWithDate,
  Reaction,
  BigLoader,
  ShareButton,
} from '../../src/components'
import Comments from './comments'
import { STORY_DATA_QUERY } from '../../src/lib/queries'
import { storyStyles } from '../../src/shared-styles/story'
const SingleStoryStyles = styled.div`
  ${props => storyStyles(props)};
  .body {
    margin-bottom: 14px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`
const Toolbar = styled.aside`
  padding: 0 24px;
  > .reaction-buttons {
    display: flex;
    margin: 20px auto;
    max-width: 700px;
    padding: 0 24px;
    justify-content: space-between;
    .reactions,
    .sharing {
      display: flex;
    }
    .share {
      width: 34px;
      height: 34px;
      margin-left: 8px;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`
const Wrapper = styled.div`
  background-color: #fff;
  transition: background-color 0.45s ease-in-out;
  min-height: 100vh;
  &.dark {
    background-color: #111;
  }
`
function SingleStory({ mode, id, viewStory }) {
  const [href, setHref] = useState(null)
  useEffect(() => {
    setHref(window.location.href)
    const viewTimer = setTimeout(viewStory, 22000) 
    return () => {
      clearTimeout(viewTimer)
    }
  }, [viewStory])
  return (
    <User>
      {({ data: { me } }) => (
        <Query query={STORY_DATA_QUERY} variables={{ id, limit: 10 }}>
          {({ error, loading, data, fetchMore }) => {
            if (error) return <ErrorMessage error={error} />
            if (loading) return <BigLoader />
            if (!data.story) return <p>Рассказа не существует</p>
            const { story, reactions, comments } = data
            return (
              <Wrapper className={cn({ dark: mode === 'dark' })}>
                <SingleStoryStyles className={cn({ dark: mode === 'dark' })}>
                  <Head>
                    <title>Shortstories - читать рассказ «{story.title}»</title>
                    <meta
                      name="title"
                      content={`Shortstories - читать рассказ «${story.title}»`}
                    />
                    <meta
                      name="description"
                      content={`Читать рассказ «${story.body.slice(
                        0,
                        100
                      )}...»`}
                    />
                    <meta
                      property="og:site_name"
                      content={`Shortstories - читать рассказ «${story.title}»`}
                    />
                    <meta
                      property="og:title"
                      content={`Shortstories - читать рассказ «${story.title}»`}
                    />
                    <meta
                      property="og:description"
                      content={`Читать рассказ «${story.body.slice(
                        0,
                        100
                      )}...»`}
                    />
                    <meta
                      name="twitter:title"
                      content={`Shortstories - читать рассказ «${story.title}»`}
                    />
                    <meta
                      name="twitter:text:title"
                      content={`Shortstories - читать рассказ «${story.title}»`}
                    />
                    <meta
                      name="twitter:description"
                      content={`Читать рассказ «${story.body.slice(
                        0,
                        100
                      )}...»`}
                    />
                  </Head>
                  <UserWithDate user={story.user} date={story.createdAt} />
                  <h1 className="title">{story.title}</h1>
                  {story.body
                    .split('\n')
                    .filter(paragraph => paragraph !== '')
                    .map((paragraph, index) => (
                      <p key={index} className="body">
                        {paragraph}
                      </p>
                    ))}
                </SingleStoryStyles>
                {me && (
                  <Toolbar>
                    <div className="reaction-buttons">
                      <div className="reactions">
                        <Reaction
                          dark={mode === 'dark'}
                          state="like"
                          id={id}
                          qty={story.stats.likes.length}
                          active={reactions.some(
                            reaction =>
                              reaction.userId === me.id &&
                              reaction.state === 'like'
                          )}
                        />
                        <Reaction
                          dark={mode === 'dark'}
                          state="dislike"
                          id={id}
                          qty={story.stats.dislikes.length}
                          active={reactions.some(
                            reaction =>
                              reaction.userId === me.id &&
                              reaction.state === 'dislike'
                          )}
                        />
                      </div>
                      <div className="sharing">
                        <ShareButton
                          className="share"
                          href={`https:
                            story.title
                          }&utm_source=share2`}
                          title="Поделиться VK"
                          icon="/static/images/icons/vk.svg"
                        />
                        <ShareButton
                          className="share"
                          href={`https:
                            story.title
                          }&url=${href}`}
                          title="Поделиться в Twitter"
                          icon="/static/images/icons/twitter.svg"
                        />
                        <ShareButton
                          className="share"
                          href={`https:
                            story.title
                          }`}
                          title="Поделиться в Facebook"
                          icon="/static/images/icons/fb.svg"
                        />
                      </div>
                    </div>
                  </Toolbar>
                )}
                <Comments
                  {...comments}
                  id={id}
                  me={me}
                  fetchMore={fetchMore}
                  isDarkMode={mode === 'dark'}
                />
              </Wrapper>
            )
          }}
        </Query>
      )}
    </User>
  )
}
export default withDarkMode(SingleStory)
