import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import Textarea from 'react-textarea-autosize'
import EditPhoto from './edit-photo'
import {
  UPDATE_ACCOUNT_MUTATION,
  CHECK_USER_EXIST_MUTATION,
} from '../lib/mutations'
import { getPhoto } from '../lib/helpers'
import { fadeIn } from '../shared-styles/animations'
const buttonStyles = css`
  background-color: #6d47d9;
  color: #fcfcfc;
  border-radius: 4px;
  display: block;
  padding: 0 12px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  transition: background-color 0.25s ease;
  &:hover {
    background-color: #5c32d5;
  }
`
const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  opacity: 0;
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.black};
  line-height: 1.5;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 24px;
  animation: ${fadeIn} 1s ease 0.2s 1 normal forwards running;
  .edit {
    display: flex;
    align-items: center;
    .edit-button {
      ${buttonStyles};
      margin-left: 28px;
    }
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .username {
    font-size: 3rem;
    font-weight: bold;
  }
  .email {
    font-size: 1.6rem;
    margin: 14px 0;
  }
  .info {
    max-width: 330px;
  }
  @media (max-width: 630px) {
    flex-direction: column;
    align-items: center;
    > img,
    > button {
      order: -1;
    }
    .username,
    .email,
    .info {
      text-align: center;
    }
    .username {
      margin: 14px 0;
    }
    .edit {
      flex-direction: column;
      .edit-button {
        margin: 0;
      }
    }
  }
`
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
  color: ${props => props.theme.black};
  input,
  textarea {
    line-height: 1.5;
    background: transparent;
    padding: 10px 15px;
    border: 1px solid
      ${({ hasError, theme }) => (hasError ? theme.red : theme.lightGrey)};
  }
  input {
    font-size: 3rem;
    font-weight: bold;
  }
  textarea {
    font-size: 1.6rem;
    width: 100%;
    resize: none;
  }
  span {
    font-size: 1.3rem;
    color: ${props => props.theme.red};
    margin-top: 2px;
  }
`
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 630px) {
    width: 100%;
    margin-top: 14px;
    .buttons {
      width: 100%;
      > button {
        flex: 1;
      }
    }
  }
  .buttons {
    display: flex;
    .save-button {
      ${buttonStyles};
    }
    .cancel-button {
      ${buttonStyles};
      background-color: transparent;
      color: ${props => props.theme.black};
      margin-left: 14px;
      &:hover {
        background-color: transparent;
      }
    }
  }
`
export function UserInfo({ user }) {
  console.log(user, getPhoto(user.photo))
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
