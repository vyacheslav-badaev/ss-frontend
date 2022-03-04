import React, { useState } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import { Form, Field } from 'react-final-form'
import { Input, ErrorMessage, Button, Logo } from '../../src/components'
import {
  REQUEST_RESET_MUTATION,
  CHECK_USER_EXIST_MUTATION,
} from '../../src/lib/mutations'
import { login } from '../../src/lib/validators'
import styles from './styles.css'
import authFormStyles from '../../src/shared-styles/auth-form.css'
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
              <ErrorMessage error={requestResetMutation.result.error} />
              {email ? (
                <div className={authFormStyles['success-message']}>
                  <h3>Запрос отправлен</h3>
                  <p>
                    Проверьте письмо по адресу <span>{email}</span> и сбросьте
                    пароль.
                  </p>
                </div>
              ) : (
                <>
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
                        type="text"
                        label="Логин"
                        error={meta.error && meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  <div className={authFormStyles['button-wrapper']}>
                    <Button
                      className={styles['back-button']}
                      onClick={Router.back}
                    >
                      Назад
                    </Button>
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
            </form>
          )}
        />
      )}
    </Composed>
  )
}
export default RequestResetForm
