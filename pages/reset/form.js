import React from 'react'
import styled from '@emotion/styled'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Input, ErrorMessage, Button, Logo } from '../../src/components'
import AuthForm from '../../src/shared-styles/auth-form'
import { CURRENT_USER_QUERY } from '../../src/lib/queries'
import { RESET_PASSWORD_MUTATION } from '../../src/lib/mutations'
import { password, confirmationPassword } from '../../src/lib/validators'
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
              <Field name="password" validate={password}>
                {({ input, meta }) => (
                  <Password
                    {...input}
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
                  <InputWithMargin
                    {...input}
                    name="passwordConfirmation"
                    type="password"
                    label="Подтвердите пароль"
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </Field>
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
