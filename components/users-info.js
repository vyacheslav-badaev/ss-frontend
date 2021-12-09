import React from 'react'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import Textarea from 'react-textarea-autosize'
import { shape, string, func } from 'prop-types'
import EditPhoto from './edit-photo'
import {
  UPDATE_ACCOUNT_MUTATION,
  CHECK_USER_EXIST_MUTATION,
} from '../lib/mutations'
import { CURRENT_USER_QUERY } from '../lib/queries'
import getPhoto from '../lib/get-photo'
import { Wrapper, FieldWrapper, EditForm } from './styles/users-info'
export function UserInfo({ user }) {
  return (
    <Wrapper>
      <div>
        <div className="username">{user.username}</div>
        <div className="info">{user.info}</div>
      </div>
      <img className="avatar" src={getPhoto(user.photo)} alt={user.username} />
    </Wrapper>
  )
}
UserInfo.propTypes = {
  user: shape({
    id: string.isRequired,
    username: string.isRequired,
    photo: string,
    info: string,
  }).isRequired,
}
export function AccountInfo({ me, setEdit }) {
  return (
    <Wrapper>
      <div>
        <div className="edit">
          <div className="username">{me.username}</div>
          <button
            className="edit-button"
            onClick={() => {
              setEdit(true)
            }}
            aria-label="Редактировать"
            type="button"
          >
            Редактировать
          </button>
        </div>
        <div className="email">{me.email}</div>
        <div className="info">{me.info}</div>
      </div>
      <img className="avatar" src={getPhoto(me.photo)} alt={me.username} />
    </Wrapper>
  )
}
AccountInfo.propTypes = {
  me: shape({
    id: string.isRequired,
    email: string.isRequired,
    username: string.isRequired,
    photo: string,
    info: string,
  }).isRequired,
  setEdit: func.isRequired,
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
    <Wrapper>
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
              <EditForm onSubmit={handleSubmit}>
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
                          <FieldWrapper hasError={meta.error && meta.touched}>
                            <input
                              {...input}
                              type="text"
                              placeholder="Псевдоним"
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </FieldWrapper>
                        )}
                      </Field>
                    )}
                  </Mutation>
                  <Field name="info" validate={infoValidation}>
                    {({ input, meta }) => (
                      <FieldWrapper hasError={meta.error && meta.touched}>
                        <Textarea
                          {...input}
                          maxLength={255}
                          placeholder="Краткое био..."
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </FieldWrapper>
                    )}
                  </Field>
                </div>
                <div className="buttons">
                  <button
                    className="save-button"
                    aria-label="Сохранить"
                    type="submit"
                  >
                    Сохранить
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setEdit(false)
                    }}
                    aria-label="Отменить"
                    type="button"
                  >
                    Отменить
                  </button>
                </div>
              </EditForm>
            )}
          </Form>
        )}
      </Mutation>
      <EditPhoto me={me} />
    </Wrapper>
  )
}
AccountEdit.propTypes = {
  me: shape({
    id: string.isRequired,
    email: string.isRequired,
    username: string.isRequired,
    photo: string,
    info: string,
  }).isRequired,
  setEdit: func.isRequired,
}
