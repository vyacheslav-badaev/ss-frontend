import React, { useState } from 'react'
import styled from '@emotion/styled'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { Form } from 'react-final-form'
import { Input, FinalFormField, ErrorMessage, Button, Logo } from '.'
import AuthForm from '../shared-styles/auth-form'
import {
  REQUEST_RESET_MUTATION,
  CHECK_USER_EXIST_MUTATION,
} from '../lib/mutations'
import { login } from '../lib/validators'
const Login = styled(Input)`
  margin-top: 36px;
  margin-bottom: 24px;
`
const BackButton = styled(Button)`
  height: 40px;
  background-color: ${props => props.theme.lightGrey};
  color: ${props => props.theme.black};
  font-weight: 400;
  font-size: 1.4rem;
  &:hover {
    background-color: #ddd;
  }
`
const Composed = adopt({
  requestResetMutation: ({ render }) => (
    <Mutation mutation={REQUEST_RESET_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  checkUserExistMutation: ({ render }) => (
    <Mutation mutation={CHECK_USER_EXIST_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
})
function RequestResetForm() {
  const [email, setEmail] = useState('')
  return (
    <Composed>
      {({ requestResetMutation, checkUserExistMutation }) => (
        <Form
          onSubmit={async values => {
            const { data } = await requestResetMutation.mutation({
              variables: { ...values },
            })
            setEmail(data.requestReset.email)
          }}
          render={({ handleSubmit, submitting }) => (
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
              <ErrorMessage error={requestResetMutation.result.error} />
              {email ? (
                <div className="success-message">
                  <h3>Запрос отправлен</h3>
                  <p>
                    Проверьте письмо по адресу <span>{email}</span> и сбросьте
                    пароль.
                  </p>
                </div>
              ) : (
                <>
                  <FinalFormField
                    name="login"
                    validate={value =>
                      login(value, checkUserExistMutation.mutation)
                    }
                  >
                    {({ input, meta }) => (
                      <Login
                        {...input}
                        name="login"
                        type="text"
                        label="Логин"
                        error={meta.error && meta.touched && meta.error}
                      />
                    )}
                  </FinalFormField>
                  <div className="button-wrapper">
                    <BackButton type="button" onClick={Router.back}>
                      Назад
                    </BackButton>
                    <Button
                      black
                      loading={requestResetMutation.result.loading}
                      disabled={submitting}
                      type="submit"
                    >
                      Восстановить
                    </Button>
                  </div>
                </>
              )}
            </AuthForm>
          )}
        />
      )}
    </Composed>
  )
}
export default RequestResetForm
