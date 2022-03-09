import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Input, ErrorMessage, Button, Logo } from '.'
import DebouncingValidatingField from './debouncing-validating-field'
import { meFragment } from '../lib/fragments'
import { SIGN_IN_MUTATION, CHECK_USER_EXIST_MUTATION } from '../lib/mutations'
import { password, login } from '../lib/validators'
import styles from './styles/signin-form.css'
import authFormStyles from './styles/auth-form.css'
function SigninForm({ returnUrl }) {
  return (
    <Mutation
      mutation={SIGN_IN_MUTATION}
      update={(cache, mutationResult) => {
        cache.writeFragment({
          id: 'Me',
          fragment: meFragment,
          data: mutationResult.data.signIn,
        })
      }}
    >
      {(signIn, { loading, error }) => (
        <Form
          onSubmit={values => {
            signIn({ variables: { ...values } }).then(() => {
              if (returnUrl) {
                Router.replace(`/${returnUrl}`)
                return
              }
              Router.push('/')
            })
          }}
          render={({ handleSubmit }) => (
            <form className={authFormStyles.form} onSubmit={handleSubmit}>
              <button
                type="button"
                className={authFormStyles.back}
                onClick={() => {
                  Router.back()
                }}
              >
                <img src="/static/images/icons/left-arrow.svg" alt="Назад" />
              </button>
              <Logo />
              <ErrorMessage error={error} />
              <Mutation
                mutation={CHECK_USER_EXIST_MUTATION}
                fetchPolicy="no-cache"
              >
                {checkUserExist => (
                  <DebouncingValidatingField
                    name="login"
                    validate={value => login(value, checkUserExist)}
                  >
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        rootClassName={styles.login}
                        name="login"
                        label="Логин"
                        error={meta.error && meta.touched && meta.error}
                      />
                    )}
                  </DebouncingValidatingField>
                )}
              </Mutation>
              <Field name="password" validate={password}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    rootClassName={styles.password}
                    name="password"
                    type="password"
                    label="Пароль"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </Field>
              <div className={authFormStyles['button-with-error']}>
                <Button black loading={loading} type="submit">
                  Войти
                </Button>
              </div>
              <Link href="/request-reset">
                <a className={authFormStyles['forgotten-link']}>
                  Забыли пароль?
                </a>
              </Link>
              <p className={authFormStyles['signup-link']}>
                Нет аккаунта?{' '}
                <Link href="/signup">
                  <a>Зарегистрируйте</a>
                </Link>
                .
              </p>
            </form>
          )}
        />
      )}
    </Mutation>
  )
}
export default SigninForm
