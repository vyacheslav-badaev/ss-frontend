import React from 'react'
import Router from 'next/router'
import styled from '@emotion/styled'
import cn from 'classnames'
import { Query, Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import { string } from 'prop-types'
import withDarkMode from '../hoc/with-dark-mode'
import GenreSelect from './GenreSelect'
import Button from './Button'
import Error from './ErrorMessage'
import { STORY_DATA_QUERY } from './SingleStory'
import { GENRES_QUERY } from '../lib/queries'
const EDIT_STORY_MUTATION = gql`
  mutation EDIT_STORY_MUTATION(
    $id: ID!
    $body: String!
    $title: String!
    $genreId: ID!
  ) {
    updateStory(id: $id, body: $body, title: $title, genreId: $genreId) {
      id
      title
      body
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
  }
  .title-block {
    input {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 4px;
    }
  }
  .body-block {
    textarea {
      font-size: 2.1rem;
      line-height: 1.4;
      resize: none;
      min-height: 50vh;
    }
  }
  .error-message {
    color: ${props => props.theme.red};
    font-size: 1.2rem;
    font-weight: bold;
  }
  button {
    position: static;
    width: auto;
    margin: 30px 0;
    padding: 1px 0;
  }
  &.dark {
    input,
    textarea {
      color: ${props => props.theme.nightGrey};
    }
    button {
      color: ${props => props.theme.black};
      background-color: ${props => props.theme.nightGrey};
    }
  }
`
export const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Введите заголовок'
  }
  if (values.body.length < 1800) {
    errors.body = 'Слишком короткая история'
  }
  if (values.body.length > 40000) {
    errors.body = 'Слишком длинная история'
  }
  if (values.genreId === null) {
    errors.genreId = 'Выберите жанр'
  }
  return errors
}
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
                  <Formik
                    initialValues={{
                      title: data.story.title,
                      body: data.story.body,
                      genreId: data.story.genre ? data.story.genre.id : null,
                    }}
                    validate={validate}
                    isInitialValid={false}
                    onSubmit={async values => {
                      await editStory({ variables: { ...values, id } })
                      Router.push('/me')
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                    }) => (
                      <Wrapper className={cn({ dark: mode === 'dark' })}>
                        <FormStyles
                          className={cn({ dark: mode === 'dark' })}
                          onSubmit={handleSubmit}
                        >
                          <Error error={error} />
                          <div className="title-block">
                            <input
                              autoCapitalize="true"
                              autoComplete="new-password"
                              placeholder="Заголовок"
                              type="text"
                              name="title"
                              id="title"
                              value={values.title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.title && touched.title && (
                              <span className="error-message">
                                {errors.title}
                              </span>
                            )}
                          </div>
                          <div className="title-block">
                            <GenreSelect
                              isDarkMode={mode === 'dark'}
                              items={genres}
                              onSelect={genre => {
                                setFieldValue('genreId', genre.id)
                              }}
                            />
                            {errors.genreId && touched.genreId && (
                              <span className="error-message">
                                {errors.genreId}
                              </span>
                            )}
                          </div>
                          <div className="body-block">
                            <ReactTextareaAutosize
                              placeholder="Расскажи историю..."
                              name="body"
                              id="body"
                              value={values.body}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.body && touched.body && (
                              <span className="error-message">
                                {errors.body}
                              </span>
                            )}
                          </div>
                          <Button loading={loading} type="submit">
                            Редактировать
                          </Button>
                        </FormStyles>
                      </Wrapper>
                    )}
                  </Formik>
                )}
              </Mutation>
            )}
          </Query>
        )
      }}
    </Query>
  )
}
StoryEditor.propTypes = {
  mode: string.isRequired,
  id: string.isRequired,
}
export default withDarkMode(StoryEditor)
