import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import cn from 'classnames'
import { Query, Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Form, Field } from 'react-final-form'
import withDarkMode from '../hoc/with-dark-mode'
import { GenreSelect, ErrorMessage, Button } from '.'
import { GENRES_QUERY, USER_QUERY } from '../lib/queries'
import { CREATE_STORY_MUTATION } from '../lib/mutations'
import { isEmpty, storyLength, withoutGenre } from '../lib/validators'
import styles from './styles/story-creator.css'
import storyStyles from './styles/story.css'
function StoryCreator({ mode, userId, theme }) {
  return (
    <Query query={GENRES_QUERY}>
      {({ data }) => {
        const { genres = [] } = data
        return (
          <Mutation
            mutation={CREATE_STORY_MUTATION}
            refetchQueries={[
              'INDEX_QUERY',
              'ME_QUERY',
              { query: USER_QUERY, variables: { id: userId } },
            ]}
            awaitRefetchQueries
          >
            {(createStory, { loading, error }) => (
              <Form
                onSubmit={async values => {
                  await createStory({
                    variables: {
                      title: values.title,
                      body: values.body,
                      genreId: values.genre.id,
                    },
                  })
                  Router.push('/')
                }}
                render={({ handleSubmit, form, submitting }) => (
                  <div
                    className={cn(styles.wrapper, {
                      [styles.dark]: mode === 'dark',
                    })}
                  >
                    <Head>
                      <title>Shortstories - написать рассказ</title>
                      <meta
                        name="title"
                        content="Shortstories - написать рассказ"
                      />
                      <meta
                        name="description"
                        content="Shortstories - написать рассказ"
                      />
                      <meta
                        property="og:site_name"
                        content="Shortstories - написать рассказ"
                      />
                      <meta
                        property="og:title"
                        content="Shortstories - написать рассказ"
                      />
                      <meta
                        property="og:description"
                        content="Shortstories - написать рассказ"
                      />
                      <meta
                        name="twitter:title"
                        content="Shortstories - написать рассказ"
                      />
                      <meta
                        name="twitter:text:title"
                        content="Shortstories - написать рассказ"
                      />
                      <meta
                        name="twitter:description"
                        content="Shortstories - написать рассказ"
                      />
                    </Head>
                    <form
                      className={cn(
                        storyStyles.story,
                        storyStyles['form-story'],
                        {
                          dark: mode === 'dark',
                        },
                      )}
                      onSubmit={handleSubmit}
                    >
                      <ErrorMessage error={error} />
                      <Field
                        name="title"
                        validate={value => isEmpty(value, 'Введите заголовок')}
                      >
                        {({ input, meta }) => (
                          <div className={storyStyles.title}>
                            <input
                              {...input}
                              autoCapitalize="true"
                              autoComplete="new-password"
                              placeholder="Заголовок"
                              type="text"
                              name="title"
                              id="title"
                              onChange={input.onChange}
                            />
                            {meta.error && meta.touched && (
                              <span className={storyStyles['error-message']}>
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="genre" validate={withoutGenre}>
                        {({ input, meta }) => (
                          <div className={storyStyles.genres}>
                            <GenreSelect
                              input={input}
                              isDarkMode={mode === 'dark'}
                              items={genres}
                              onSelect={genre => {
                                form.change('genre', genre)
                              }}
                            />
                            {meta.error && meta.touched && (
                              <span className={storyStyles['error-message']}>
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="body" validate={storyLength}>
                        {({ input, meta }) => (
                          <div className={storyStyles.body}>
                            <ReactTextareaAutosize
                              {...input}
                              placeholder="Расскажите историю..."
                              name="body"
                              id="body"
                              maxLength={40000}
                              onChange={input.onChange}
                            />
                            {meta.error && meta.touched && (
                              <span className={storyStyles['error-message']}>
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                      <Button
                        black
                        loading={loading}
                        disabled={submitting}
                        type="submit"
                      >
                        Опубликовать
                      </Button>
                    </form>
                  </div>
                )}
              />
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}
export default withDarkMode(StoryCreator)
