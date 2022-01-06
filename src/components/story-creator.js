import React, { useState } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import styled from '@emotion/styled'
import cn from 'classnames'
import { Query, Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Form } from 'react-final-form'
import nanoid from 'nanoid'
import withDarkMode from '../hoc/with-dark-mode'
import { GenreSelect, ErrorMessage, Button, FinalFormField } from '.'
import { GENRES_QUERY, ALL_STORIES_QUERY } from '../lib/queries'
import { CREATE_STORY_MUTATION } from '../lib/mutations'
import { isEmpty, storyLength, withoutGenre } from '../lib/validators'
const Wrapper = styled.div`
  background-color: #fff;
  transition: background-color 0.45s ease-in-out;
  min-height: 100vh;
  &.dark {
    background-color: #111;
  }
`
const FormStyles = styled.form`
  max-width: 700px;
  padding: 24px;
  padding-top: 104px;
  margin: 0 auto;
  display: grid;
  .title-block,
  .body-block {
    margin-bottom: 20px;
  }
  input,
  textarea {
    width: 100%;
    font-family: ${props => props.theme.textFont};
    border: none;
    outline: none;
    color: ${props => props.theme.black};
    background: transparent;
    &::placeholder {
      color: #aaa;
    }
  }
  .title-block {
    > input {
      font-size: 3.2rem;
      line-height: 3.2rem;
      font-weight: 700;
      margin-bottom: 4px;
    }
  }
  .body-block {
    textarea {
      font-size: 1.8rem;
      line-height: 2.8rem;
      resize: none;
      min-height: 50vh;
    }
  }
  .error-message {
    color: ${props => props.theme.red};
    font-size: 1.2rem;
    font-weight: bold;
  }
  button[type='submit'] {
    position: static;
    width: auto;
    margin: 30px 0;
    padding: 1px 0;
  }
  &.dark {
    input,
    textarea,
    button {
      color: ${props => props.theme.nightGrey};
    }
    button[type='submit'] {
      color: ${props => props.theme.black};
      background-color: ${props => props.theme.nightGrey};
    }
  }
`
function update(cache, payload) {
  try {
    const stories = cache.readQuery({ query: ALL_STORIES_QUERY })
    stories.stories.edges = [...stories.stories.edges, payload.data.createStory]
    cache.writeQuery({
      query: ALL_STORIES_QUERY,
      data: stories,
    })
  } catch (error) {
  }
}
const INITIAL_VALUES = {
  title: '',
  body: '',
  genreId: null,
}
function StoryCreator({ mode }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [genreId, setGenreId] = useState(null)
  return (
    <Query query={GENRES_QUERY}>
      {({ data }) => {
        const { genres = [] } = data
        return (
          <Mutation
            mutation={CREATE_STORY_MUTATION}
            update={update}
            optimisticResponse={{
              __typename: 'Mutation',
              createStory: {
                __typename: 'Story',
                id: nanoid(10),
                title,
                body,
                genreId,
              },
            }}
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
                  Router.push('/me')
                }}
                render={({ handleSubmit, form, submitting }) => (
                  <Wrapper className={cn({ dark: mode === 'dark' })}>
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
                    <FormStyles
                      className={cn({ dark: mode === 'dark' })}
                      onSubmit={handleSubmit}
                    >
                      <ErrorMessage error={error} />
                      <FinalFormField
                        name="title"
                        validate={value => isEmpty(value, 'Введите заголовок')}
                      >
                        {({ input, meta }) => (
                          <div className="title-block">
                            <input
                              {...input}
                              autoCapitalize="true"
                              autoComplete="new-password"
                              placeholder="Заголовок"
                              type="text"
                              name="title"
                              id="title"
                              onChange={event => {
                                input.onChange(event)
                                setTitle(event.target.value)
                              }}
                            />
                            {meta.error && meta.touched && (
                              <span className="error-message">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </FinalFormField>
                      <FinalFormField name="genre" validate={withoutGenre}>
                        {({ input, meta }) => (
                          <div className="title-block">
                            <GenreSelect
                              input={input}
                              isDarkMode={mode === 'dark'}
                              items={genres}
                              onSelect={genre => {
                                form.change('genre', genre)
                                setGenreId(genre.id)
                              }}
                            />
                            {meta.error && meta.touched && (
                              <span className="error-message">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </FinalFormField>
                      <FinalFormField name="body" validate={storyLength}>
                        {({ input, meta }) => (
                          <div className="body-block">
                            <ReactTextareaAutosize
                              {...input}
                              placeholder="Расскажите историю..."
                              name="body"
                              id="body"
                              maxLength={40000}
                              onChange={event => {
                                input.onChange(event)
                                setBody(event.target.value)
                              }}
                            />
                            {meta.error && meta.touched && (
                              <span className="error-message">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </FinalFormField>
                      <Button
                        black
                        loading={loading}
                        disabled={submitting}
                        type="submit"
                      >
                        Опубликовать
                      </Button>
                    </FormStyles>
                  </Wrapper>
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
