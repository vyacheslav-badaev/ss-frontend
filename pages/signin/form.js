import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { Form, Field } from 'react-final-form'
import { Input, ErrorMessage, Button, Logo } from '../../src/components'
import { CURRENT_USER_QUERY } from '../../src/lib/queries'
import {
  SIGN_IN_MUTATION,
  CHECK_USER_EXIST_MUTATION,
} from '../../src/lib/mutations'
import { password, login } from '../../src/lib/validators'
import styles from './styles.css'
import authFormStyles from '../../src/shared-styles/auth-form.css'
const Composed = adopt({
  signInMutation: ({ render }) => (
    <Mutation
      mutation={SIGN_IN_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  checkUserExistMutation: ({ render }) => (
    <Mutation mutation={CHECK_USER_EXIST_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
})
function SigninForm({ returnUrl }) {
  return (
    <Composed>
      {({ signInMutation, checkUserExistMutation }) => (
        <Form
          onSubmit={async values => {
            try {
              await signInMutation.mutation({ variables: { ...values } })
              if (returnUrl) {
                Router.replace(`/${returnUrl}`)
                return
              }
              Router.push('/')
            } catch (error) {
              console.error(error) 
            }
          }}
          render={({ handleSubmit, submitting }) => (
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
              <ErrorMessage error={signInMutation.result.error} />
              <Field
                name="login"
                validate={value =>
                  login(value, checkUserExistMutation.mutation)
                }
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
              </Field>
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
                <Button
                  black
                  loading={signInMutation.result.loading}
                  disabled={submitting}
                  type="submit"
                >
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
    </Composed>
  )
}
export default SigninForm
