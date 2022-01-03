import React from 'react'
import styled from '@emotion/styled'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { Form } from 'react-final-form'
import { Input, FinalFormField, ErrorMessage, Button, Logo } from '.'
import AuthForm from '../shared-styles/auth-form'
import { CURRENT_USER_QUERY } from '../lib/queries'
import { RESET_PASSWORD_MUTATION } from '../lib/mutations'
import { password, confirmationPassword } from '../lib/validators'
const Password = styled(Input)`
  margin-top: 36px;
  margin-bottom: 24px;
`
const InputWithMargin = styled(Input)`
  margin-bottom: 24px;
`
function ResetPasswordForm({ token }) {
  return (
    <Mutation
      mutation={RESET_PASSWORD_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(reset, { error, loading }) => (
        <Form
          onSubmit={async values => {
            await reset({ variables: { ...values, token } })
            Router.push('/')
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
              <ErrorMessage error={error} />
              <FinalFormField name="password" validate={password}>
                {({ input, meta }) => (
                  <Password
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
                  loading={loading}
                  disabled={submitting}
                  type="submit"
                >
                  Сбросить
                </Button>
              </div>
            </AuthForm>
          )}
        />
      )}
    </Mutation>
  )
}
export default ResetPasswordForm
