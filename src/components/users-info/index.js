import React from 'react'
import cn from 'classnames'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import Textarea from 'react-textarea-autosize'
import EditPhoto from '../edit-photo'
import {
  UPDATE_ACCOUNT_MUTATION,
  CHECK_USER_EXIST_MUTATION,
} from '../../lib/mutations'
import { getPhoto } from '../../lib/helpers'
import styles from './styles.css'
export function UserInfo({ user }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.username}>{user.username}</div>
        <div className={styles.info}>{user.info}</div>
      </div>
      <img
        className={styles.avatar}
        src={getPhoto(user.photo)}
        alt={user.username}
      />
    </section>
  )
}
export function AccountInfo({ me, setEdit }) {
  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.edit}>
          <div className={styles.username}>{me.username}</div>
          <button
            className={cn(styles.button, styles['edit-button'])}
            onClick={() => {
              setEdit(true)
            }}
            aria-label="Редактировать"
            type="button"
          >
            Редактировать
          </button>
        </div>
        <div className={styles.email}>{me.email}</div>
        <div className={styles.info}>{me.info}</div>
      </div>
      <img
        className={styles.avatar}
        src={getPhoto(me.photo)}
        alt={me.username}
      />
    </section>
  )
}
export function AccountEdit({ me, setEdit }) {
  async function usernameValidation(value, check, initialValue) {
    if (!value) return 'Введите псевдоним'
    if (value !== initialValue) {
      const { data } = await check({ variables: { login: value } })
      if (data.checkUserExist) {
        return 'Псевдоним уже занят'
      }
    }
  }
  function infoValidation(value) {
    if (value.length < 8) return 'Слишком мало информации'
  }
  return (
    <section className={styles.wrapper}>
      <Mutation mutation={UPDATE_ACCOUNT_MUTATION}>
        {update => (
          <Form
            initialValues={{
              username: me.username,
              info: me.info || '',
            }}
            onSubmit={async values => {
              await update({
                variables: { username: values.username, info: values.info },
              })
              setEdit(false)
            }}
          >
            {({ handleSubmit }) => (
              <form className={styles['edit-form']} onSubmit={handleSubmit}>
                <div>
                  <Mutation mutation={CHECK_USER_EXIST_MUTATION}>
                    {check => (
                      <Field
                        name="username"
                        validate={value =>
                          usernameValidation(value, check, me.username)
                        }
                      >
                        {({ input, meta }) => (
                          <div className={styles['field-wrapper']}>
                            <input
                              {...input}
                              className={cn({
                                [styles.error]: meta.error && meta.touched,
                              })}
                              type="text"
                              placeholder="Псевдоним"
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    )}
                  </Mutation>
                  <Field name="info" validate={infoValidation}>
                    {({ input, meta }) => (
                      <div className={styles['field-wrapper']}>
                        <Textarea
                          {...input}
                          maxLength={255}
                          placeholder="Краткое био..."
                          className={cn({
                            [styles.error]: meta.error && meta.touched,
                          })}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className={styles.buttons}>
                  <button
                    className={cn(styles.button, styles['save-button'])}
                    aria-label="Сохранить"
                    type="submit"
                  >
                    Сохранить
                  </button>
                  <button
                    className={cn(styles.button, styles['cancel-button'])}
                    onClick={() => {
                      setEdit(false)
                    }}
                    aria-label="Отменить"
                    type="button"
                  >
                    Отменить
                  </button>
                </div>
              </form>
            )}
          </Form>
        )}
      </Mutation>
      <EditPhoto me={me} />
    </section>
  )
}
