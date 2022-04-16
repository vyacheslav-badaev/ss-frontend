import React from 'react'
import Router from 'next/router'
import cn from 'classnames'
import { Mutation } from 'react-apollo'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Form, Field } from 'react-final-form'
import withDarkMode from '../hoc/with-dark-mode'
import { GenreSelect, ErrorMessage, Button } from '.'
import { USER_QUERY } from '../../src/lib/queries'
import { EDIT_STORY_MUTATION } from '../../src/lib/mutations'
import { isEmpty, storyLength, withoutGenre } from '../../src/lib/validators'
import styles from './styles/story-editor.css'
import storyStyles from './styles/story.css'
function StoryEditor({ mode, id, userId, story, theme, genres }) {
  return (
    <Mutation
      mutation={EDIT_STORY_MUTATION}
      refetchQueries={[
        'INDEX_QUERY',
        'ME_QUERY',
        { query: USER_QUERY, variables: { id: userId } },
      ]}
      awaitRefetchQueries
    >
      {(editStory, { loading, error }) => (
        <Form
          initialValues={{
            title: story.title,
            body: story.body,
            genre: story.genre,
          }}
          onSubmit={async values => {
            await editStory({
              variables: {
                title: values.title,
                body: values.body,
                genreId: values.genre.id,
                id,
              },
            })
            Router.push('/me')
          }}
          render={({ handleSubmit, form, submitting }) => (
            <div
              className={cn(styles.wrapper, {
                [styles.dark]: mode === 'dark',
              })}
            >
              <form
                className={cn(storyStyles.story, storyStyles['form-story'], {
                  [storyStyles.dark]: mode === 'dark',
                })}
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
                  Редактировать
                </Button>
              </form>
            </div>
          )}
        />
      )}
    </Mutation>
  )
}
export default withDarkMode(StoryEditor)
