import React, { useState } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { Form } from 'react-final-form'
import { Input, ErrorMessage, Button, Logo } from '.'
import DebouncingValidatingField from './debouncing-validating-field'
import {
  REQUEST_RESET_MUTATION,
  CHECK_USER_EXIST_MUTATION,
} from '../lib/mutations'
import { login } from '../lib/validators'
import styles from './styles/request-reset-form.css'
import authFormStyles from './styles/auth-form.css'
function RequestResetForm() {
  const [email, setEmail] = useState('')
  return (
    <Mutation mutation={REQUEST_RESET_MUTATION} fetchPolicy="no-cache">
      {(requestReset, { loading, error }) => (
        <Form
          onSubmit={async values => {
            const { data } = await requestReset({
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
              <ErrorMessage error={error} />
              {email ? (
                <div className={authFormStyles['success-message']}>
                  <h3>Запрос отправлен</h3>
                  <p>
                    Проверьте письмо по&nbsp;адресу <span>{email}</span>{' '}
                    и&nbsp;сбросьте пароль.
                  </p>
                </div>
              ) : (
                <>
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
                            type="text"
                            label="Логин"
                            error={meta.error && meta.touched && meta.error}
                          />
                        )}
                      </DebouncingValidatingField>
                    )}
                  </Mutation>
                  <div className={authFormStyles['button-wrapper']}>
                    <Button
                      className={styles['back-button']}
                      onClick={Router.back}
                    >
                      Назад
                    </Button>
                    <Button
                      black
                      loading={loading}
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
    </Mutation>
  )
}
export default RequestResetForm
