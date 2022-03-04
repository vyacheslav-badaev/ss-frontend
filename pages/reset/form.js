import React from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Input, ErrorMessage, Button, Logo } from '../../src/components'
import { CURRENT_USER_QUERY } from '../../src/lib/queries'
import { RESET_PASSWORD_MUTATION } from '../../src/lib/mutations'
import { password, confirmationPassword } from '../../src/lib/validators'
import styles from './styles.css'
import authFormStyles from '../../src/shared-styles/auth-form.css'
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
              <Field name="password" validate={password}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    name="password"
                    type="password"
                    label="Пароль"
                    rootClassName={styles.password}
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
                    name="passwordConfirmation"
                    type="password"
                    label="Подтвердите пароль"
                    rootClassName={styles['with-margin']}
                    error={meta.error && meta.touched && meta.error}
                  />
                )}
              </Field>
              <div className={authFormStyles['button-with-error']}>
                <Button
                  black
                  loading={loading}
                  disabled={submitting}
                  type="submit"
                >
                  Сбросить
                </Button>
              </div>
            </form>
          )}
        />
      )}
    </Mutation>
  )
}
export default ResetPasswordForm
