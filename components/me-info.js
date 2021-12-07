import React, { useState } from 'react'
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
import { CURRENT_USER_QUERY } from '../lib/queries'
import getPhoto from '../lib/get-photo'
const buttonStyles = css`
  background-color: #6d47d9;
  color: #fcfcfc;
  border-radius: 4px;
  display: block;
  padding: 0 12px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  font-weight: bold;
  transition: background-color 0.25s ease;
  &:hover {
    background-color: #5c32d5;
  }
`
const SaveButton = styled.button`
  ${buttonStyles};
`
const EditButton = styled.button`
  ${buttonStyles};
  margin-left: 28px;
`
const CancelButton = styled.button`
  ${buttonStyles};
  background-color: transparent;
  color: ${props => props.theme.black};
  margin-left: 14px;
  &:hover {
    background-color: transparent;
  }
`
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const EditUsername = styled.input`
  color: ${props => props.theme.black};
  font-size: 3rem;
  font-weight: bold;
  background: transparent;
  padding: 10px 15px;
  border: 1px solid ${props => (props.hasError ? props.theme.red : 'lightgray')};
`
const EditInfo = styled(Textarea)`
  color: ${props => props.theme.black};
  width: 100%;
  resize: none;
  font-size: 1.6rem;
  line-height: 1.5;
  background: transparent;
  padding: 10px 15px;
  border: 1px solid ${props => (props.hasError ? props.theme.red : 'lightgray')};
`
const Edit = styled.div`
  display: flex;
  align-items: center;
`
const Buttons = styled.div`
  display: flex;
`
const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.white};
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 20px;
  @media (max-width: 630px) {
    flex-direction: column;
    align-items: center;
    > img,
    > button {
      order: -1;
    }
    ${Edit} {
      flex-direction: column;
    }
    ${EditButton} {
      margin: 0;
    }
    ${EditForm} {
      width: 100%;
      margin-top: 14px;
    }
    ${Buttons} {
      width: 100%;
      > button {
        flex: 1;
      }
    }
    .username,
    .email,
    .info {
      text-align: center;
    }
    .username {
      margin: 14px 0;
    }
  }
  .edit {
    position: absolute;
    top: 0;
    right: 0;
    border-top-right-radius: 8px;
    background-color: ${props => props.theme.white};
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.25s ease-in-out;
    &:hover {
      background-color: ${props => props.theme.lightGrey};
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  .accept {
    border-top-right-radius: 0;
    right: 50px;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .username {
    color: ${props => props.theme.black};
    font-size: 3rem;
    font-weight: bold;
  }
  .email {
    color: ${props => props.theme.black};
    font-size: 1.6rem;
    margin: 14px 0;
  }
  .info {
    line-height: 1.5;
    max-width: 330px;
  }
`
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`
const ErrorMessage = styled.span`
  font-size: 13px;
  color: ${props => props.theme.red};
  margin-top: 2px;
`
const usernameValidation = async (value, check, initialValue) => {
  if (!value) return 'Введите псевдоним'
  if (value !== initialValue) {
    const { data } = await check({ variables: { login: value } })
    if (data.checkUserExist) {
      return 'Псевдоним уже занят'
    }
  }
}
const infoValidation = value => {
  if (value.length < 8) return 'Слишком мало информации'
}
function MeInfo({ me }) {
  const [isEdit, setEdit] = useState(false)
  return (
    <Mutation
      mutation={UPDATE_ACCOUNT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {update => (
        <Wrapper>
          {isEdit ? (
            <>
              <Form
                onSubmit={async values => {
                  await update({
                    variables: { username: values.username, info: values.info },
                  })
                  setEdit(false)
                }}
                initialValues={{
                  username: me.username,
                  info: me.info || '',
                }}
                render={({ handleSubmit }) => (
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
                              <FieldWrapper>
                                <EditUsername
                                  {...input}
                                  type="text"
                                  placeholder="Псевдоним"
                                  hasError={meta.error && meta.touched}
                                />
                                {meta.error && meta.touched && (
                                  <ErrorMessage>{meta.error}</ErrorMessage>
                                )}
                              </FieldWrapper>
                            )}
                          </Field>
                        )}
                      </Mutation>
                      <Field name="info" validate={infoValidation}>
                        {({ input, meta }) => (
                          <FieldWrapper>
                            <EditInfo
                              {...input}
                              maxLength={255}
                              placeholder="Краткое био..."
                              hasError={meta.error && meta.touched}
                            />
                            {meta.error && meta.touched && (
                              <ErrorMessage>{meta.error}</ErrorMessage>
                            )}
                          </FieldWrapper>
                        )}
                      </Field>
                    </div>
                    <Buttons>
                      <SaveButton type="submit">Сохранить</SaveButton>
                      <CancelButton
                        onClick={() => {
                          setEdit(false)
                        }}
                        type="button"
                      >
                        Отменить
                      </CancelButton>
                    </Buttons>
                  </EditForm>
                )}
              />
              <EditPhoto me={me} />
            </>
          ) : (
            <>
              <div>
                <Edit>
                  <div className="username">{me.username}</div>
                  <EditButton
                    onClick={() => {
                      setEdit(true)
                    }}
                    type="button"
                  >
                    Редактировать
                  </EditButton>
                </Edit>
                <div className="email">{me.email}</div>
                <div className="info">{me.info}</div>
              </div>
              <img
                className="avatar"
                src={getPhoto(me.photo)}
                alt={me.username}
              />
            </>
          )}
        </Wrapper>
      )}
    </Mutation>
  )
}
export default MeInfo
