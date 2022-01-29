import React from 'react'
import Router from 'next/router'
import styled from '@emotion/styled'
import cn from 'classnames'
import { Query, Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Form, Field } from 'react-final-form'
import withDarkMode from '../../src/hoc/with-dark-mode'
import { GenreSelect, ErrorMessage, Button } from '../../src/components'
import { storyStyles, formStoryStyles } from '../../src/shared-styles/story'
import { GENRES_QUERY, STORY_DATA_QUERY } from '../../src/lib/queries'
import { EDIT_STORY_MUTATION } from '../../src/lib/mutations'
import { isEmpty, storyLength, withoutGenre } from '../../src/lib/validators'
const Wrapper = styled.div`
  background-color: #fff;
  transition: background-color 0.45s ease-in-out;
  min-height: 100vh;
  &.dark {
    background-color: #111;
  }
`
const FormStyles = styled.form`
  ${props => storyStyles(props)};
  ${props => formStoryStyles(props)};
`
function StoryEditor({ mode, id }) {
  return (
    <Query query={GENRES_QUERY}>
      {genresData => {
        const { genres = [] } = genresData.data
        return (
          <Query query={STORY_DATA_QUERY} variables={{ id }}>
            {({ data }) => (
              <Mutation mutation={EDIT_STORY_MUTATION}>
                {(editStory, { loading, error }) => (
                  <Form
                    initialValues={{
                      title: data.story.title,
                      body: data.story.body,
                      genre: data.story.genre,
                    }}
                    onSubmit={async values => {
                      await editStory({ variables: { ...values, id } })
                      Router.push('/me')
                    }}
                    render={({ handleSubmit, form, submitting }) => (
                      <Wrapper className={cn({ dark: mode === 'dark' })}>
                        <FormStyles
                          className={cn({ dark: mode === 'dark' })}
                          onSubmit={handleSubmit}
                        >
                          <ErrorMessage error={error} />
                          <Field
                            name="title"
                            validate={value =>
                              isEmpty(value, 'Введите заголовок')
                            }
                          >
                            {({ input, meta }) => (
                              <div className="title">
                                <input
                                  {...input}
                                  autoCapitalize="true"
                                  autoComplete="new-password"
                                  placeholder="Заголовок"
                                  type="text"
                                  name="title"
                                  id="title"
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-message">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                          <Field name="genre" validate={withoutGenre}>
                            {({ input, meta }) => (
                              <div className="genres">
                                <GenreSelect
                                  input={input}
                                  isDarkMode={mode === 'dark'}
                                  items={genres}
                                  onSelect={genre => {
                                    form.change('genre', genre)
                                  }}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-message">
                                    {meta.error}
                                  </span>
                                )}
                              </div>
                            )}
                          </Field>
                          <Field name="body" validate={storyLength}>
                            {({ input, meta }) => (
                              <div className="body">
                                <ReactTextareaAutosize
                                  {...input}
                                  placeholder="Расскажите историю..."
                                  name="body"
                                  id="body"
                                  maxLength={40000}
                                />
                                {meta.error && meta.touched && (
                                  <span className="error-message">
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
                            Редактировать
                          </Button>
                        </FormStyles>
                      </Wrapper>
                    )}
                  />
                )}
              </Mutation>
            )}
          </Query>
        )
      }}
    </Query>
  )
}
export default withDarkMode(StoryEditor)
