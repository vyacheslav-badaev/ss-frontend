import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { Form } from 'react-final-form'
import { Input, FinalFormField, ErrorMessage, Button, Logo } from '.'
import AuthForm from '../shared-styles/auth-form'
import { CURRENT_USER_QUERY } from '../lib/queries'
import { SIGN_UP_MUTATION, CHECK_USER_EXIST_MUTATION } from '../lib/mutations'
import {
  isEmail,
  username,
  password,
  confirmationPassword,
} from '../lib/validators'
const Username = styled(Input)`
  margin-top: 36px;
  margin-bottom: 24px;
`
const InputWithMargin = styled(Input)`
  margin-bottom: 24px;
`
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
            <AuthForm onSubmit={handleSubmit}>
              <button
                type="button"
                className="back"
                onClick={() => {
                  Router.back()
                }}
              >
                <img src="/static/images/icons/left-arrow.svg" alt="Назад" />
              </button>
              <Logo />
              <ErrorMessage error={signUpMutation.result.error} />
              <FinalFormField
                name="username"
                validate={value =>
                  username(value, checkUserExistMutation.mutation)
                }
              >
                {({ input, meta }) => (
                  <Username
                    {...input}
                    name="username"
                    type="text"
                    label="Псевдоним"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </FinalFormField>
              <FinalFormField
                name="email"
                validate={value =>
                  isEmail(value, checkUserExistMutation.mutation)
                }
              >
                {({ input, meta }) => (
                  <InputWithMargin
                    {...input}
                    name="email"
                    type="email"
                    label="E-mail"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </FinalFormField>
              <FinalFormField name="password" validate={password}>
                {({ input, meta }) => (
                  <InputWithMargin
                    {...input}
                    name="password"
                    type="password"
                    label="Пароль"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </FinalFormField>
              <FinalFormField
                name="passwordConfirmation"
                validate={value => confirmationPassword(value, values.password)}
              >
                {({ input, meta }) => (
                  <InputWithMargin
                    {...input}
                    name="passwordConfirmation"
                    type="password"
                    label="Подтвердите пароль"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </FinalFormField>
              <div className="button-with-error">
                <Button
                  black
                  loading={signUpMutation.result.loading}
                  disabled={submitting}
                  type="submit"
                >
                  Зарегистрироваться
                </Button>
              </div>
              <p className="signup-link">
                Уже есть аккаунт?{' '}
                <Link href="/signin">
                  <a>Войдите</a>
                </Link>
                .
              </p>
            </AuthForm>
          )}
        />
      )}
    </Composed>
  )
}
export default SignupForm
