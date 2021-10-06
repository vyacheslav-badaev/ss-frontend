import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik } from 'formik'
import { adopt } from 'react-adopt'
import AuthForm from './styles/AuthForm'
import Input from './Input'
import Error from './ErrorMessage'
import Button from './Button'
import Logo from './Logo'
import { CHECK_USER_EXIST_MUTATION } from './Signup'
import { login } from '../lib/validators'
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($login: String!) {
    requestReset(login: $login) {
      email
    }
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
class RequestReset extends Component {
  state = {
    requestSentEmail: '',
  }
  render() {
    const { requestSentEmail } = this.state
    return (
      <Composed>
        {({ requestResetMutation, checkUserExistMutation }) => (
          <Formik
            isInitialValid={false}
            initialValues={{ login: '' }}
            onSubmit={values => {
              requestResetMutation
                .mutation({ variables: { ...values } })
                .then(res => {
                  this.setState({
                    requestSentEmail: res.data.requestReset.email,
                  })
                })
            }}
            render={props => (
              <AuthForm onSubmit={props.handleSubmit}>
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
                <Error error={requestResetMutation.result.error} />
                {requestSentEmail ? (
                  <div className="success-message">
                    <h3>Запрос отправлен</h3>
                    <p>
                      Проверьте письмо по адресу <span>{requestSentEmail}</span>{' '}
                      и сбросьте пароль.
                    </p>
                  </div>
                ) : (
                  <>
                    <Input
                      name="login"
                      label="Логин"
                      validate={value =>
                        login(value, checkUserExistMutation.mutation)
                      }
                    />
                    <div className="button-wrapper">
                      <Button
                        loading={requestResetMutation.result.loading}
                        type="submit"
                      >
                        Восстановить
                      </Button>
                      <Button onClick={Router.back}>Назад</Button>
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
}
export default RequestReset