import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { Form, Field } from 'react-final-form'
import { Input, ErrorMessage, Button, Logo } from '../../src/components'
import { CURRENT_USER_QUERY } from '../../src/lib/queries'
import {
  SIGN_UP_MUTATION,
  CHECK_USER_EXIST_MUTATION,
} from '../../src/lib/mutations'
import {
  isEmail,
  username,
  password,
  confirmationPassword,
} from '../../src/lib/validators'
import styles from './styles.css'
import authFormStyles from '../../src/shared-styles/auth-form.css'
const Composed = adopt({
  signUpMutation: ({ render }) => (
    <Mutation
      mutation={SIGN_UP_MUTATION}
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
function SignupForm() {
  return (
    <Composed>
      {({ signUpMutation, checkUserExistMutation }) => (
        <Form
          onSubmit={async values => {
            try {
              await signUpMutation.mutation({ variables: { ...values } })
              Router.push('/')
            } catch (error) {
              console.error(error) 
            }
          }}
          render={({ handleSubmit, submitting, values }) => (
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
              <ErrorMessage error={signUpMutation.result.error} />
              <Field
                name="username"
                validate={value =>
                  username(value, checkUserExistMutation.mutation)
                }
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    rootClassName={styles.username}
                    name="username"
                    type="text"
                    label="Псевдоним"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field
                name="email"
                validate={value =>
                  isEmail(value, checkUserExistMutation.mutation)
                }
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    rootClassName={styles['with-margin']}
                    name="email"
                    type="email"
                    label="E-mail"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field name="password" validate={password}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    rootClassName={styles['with-margin']}
                    name="password"
                    type="password"
                    label="Пароль"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field
                name="passwordConfirmation"
                validate={value => confirmationPassword(value, values.password)}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    rootClassName={styles['with-margin']}
                    name="passwordConfirmation"
                    type="password"
                    label="Подтвердите пароль"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </Field>
              <div className={authFormStyles['button-with-error']}>
                <Button
                  black
                  loading={signUpMutation.result.loading}
                  disabled={submitting}
                  type="submit"
                >
                  Зарегистрироваться
                </Button>
              </div>
              <p className={authFormStyles['signup-link']}>
                Уже есть аккаунт?{' '}
                <Link href="/signin">
                  <a>Войдите</a>
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
export default SignupForm
