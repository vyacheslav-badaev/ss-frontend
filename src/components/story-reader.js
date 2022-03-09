import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Query } from 'react-apollo'
import cn from 'classnames'
import withDarkMode from '../hoc/with-dark-mode'
import { ErrorMessage, UserWithDate, Reaction, BigLoader, ShareButton } from '.'
import Comments from './comments'
import { STORY_QUERY } from '../lib/queries'
import styles from './styles/story-reader.css'
import storyStyles from './styles/story.css'
function StoryReader({ mode, id, viewStory, theme }) {
  const [href, setHref] = useState(null)
  useEffect(() => {
    setHref(window.location.href)
    const viewTimer = setTimeout(viewStory, 22000) 
    return () => {
      clearTimeout(viewTimer)
    }
  }, [viewStory])
  return (
    <Query query={STORY_QUERY} variables={{ id, limit: 10 }}>
      {({ error, loading, data, fetchMore }) => {
        if (error) return <ErrorMessage error={error} />
        if (loading) return <BigLoader />
        if (!data.story) return <p>Рассказа не существует</p>
        const { story, comments, me } = data
        return (
          <div
            className={cn(styles['story-wrapper'], {
              [styles.dark]: mode === 'dark',
            })}
          >
            <div
              className={cn(storyStyles.story, {
                [storyStyles.dark]: mode === 'dark',
              })}
            >
              <Head>
                <title>Shortstories - читать рассказ «{story.title}»</title>
                <meta
                  name="title"
                  content={`Shortstories - читать рассказ «${story.title}»`}
                />
                <meta
                  name="description"
                  content={`Читать рассказ «${story.body.slice(0, 100)}...»`}
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
                  content={`Читать рассказ «${story.body.slice(0, 100)}...»`}
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
                  content={`Читать рассказ «${story.body.slice(0, 100)}...»`}
                />
              </Head>
              <UserWithDate user={story.user} date={story.createdAt} />
              <h1 className={storyStyles.title}>{story.title}</h1>
              {story.body
                .split('\n')
                .filter(paragraph => paragraph !== '')
                .map((paragraph, index) => (
                  <p key={index} className={storyStyles.body}>
                    {paragraph}
                  </p>
                ))}
            </div>
            {+me.id > 0 && (
              <div className={styles['story-toolbar']}>
                <div className={styles['reaction-buttons']}>
                  <div className={styles.reactions}>
                    <Reaction
                      dark={mode === 'dark'}
                      state="like"
                      id={id}
                      qty={story.stats.likes.length}
                      active={story.stats.likes.some(l => l.id === me.id)}
                    />
                    <Reaction
                      dark={mode === 'dark'}
                      state="dislike"
                      id={id}
                      qty={story.stats.dislikes.length}
                      active={story.stats.dislikes.some(d => d.id === me.id)}
                    />
                  </div>
                  <div className={styles.sharing}>
                    <ShareButton
                      className={styles.share}
                      href={`https:
                        story.title
                      }&utm_source=share2`}
                      title="Поделиться VK"
                      icon="/static/images/icons/vk.svg"
                    />
                    <ShareButton
                      className={styles.share}
                      href={`https:
                        story.title
                      }&url=${href}`}
                      title="Поделиться в Twitter"
                      icon="/static/images/icons/twitter.svg"
                    />
                    <ShareButton
                      className={styles.share}
                      href={`https:
                        story.title
                      }`}
                      title="Поделиться в Facebook"
                      icon="/static/images/icons/fb.svg"
                    />
                  </div>
                </div>
              </div>
            )}
            <Comments
              {...comments}
              id={id}
              me={me}
              fetchMore={fetchMore}
              isDarkMode={mode === 'dark'}
            />
          </div>
        )
      }}
    </Query>
  )
}
export default withDarkMode(StoryReader)
