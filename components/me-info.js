import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Mutation } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import Modal from './modal'
import DropAndCrop from './DropAndCrop'
import { UPDATE_ACCOUNT_MUTATION } from '../lib/mutations'
import { CURRENT_USER_QUERY } from '../lib/queries'
import getPhoto from '../lib/get-photo'
const Button = styled.button`
  margin-left: 20px;
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
const Wrapper = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.white};
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 20px;
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
    margin-bottom: 20px;
  }
  .photo-edit {
    cursor: pointer;
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    outline: none;
    width: 120px;
    height: 120px;
    .photo-icon {
      position: absolute;
      width: 40px;
      height: 40px;
      top: 40px;
      left: 40px;
      right: 0;
      bottom: 0;
    }
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .blur {
      width: 100%;
      height: 100%;
      background-color: #333;
      opacity: 0.4;
      border-radius: 50%;
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.25s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }
  }
`
const Edit = styled.div`
  display: flex;
  align-items: center;
`
function MeInfo({ me }) {
  const [isEdit, setEdit] = useState(false)
  const [isOpen, setOpen] = useState(false)
  return (
    <Mutation mutation={UPDATE_ACCOUNT_MUTATION}>
      {update => (
        <Wrapper>
          {isEdit ? (
            <>
              <div>
                <Edit>
                  <div className="username">{me.username}</div>
                  <Button
                    onClick={() => {
                      setEdit(true)
                    }}
                    type="button"
                  >
                    Сохранить
                  </Button>
                  <button
                    onClick={() => {
                      setEdit(false)
                    }}
                    type="button"
                  >
                    Отменить
                  </button>
                </Edit>
                <div className="email">{me.email}</div>
              </div>
              <button
                onClick={() => {
                  setOpen(true)
                }}
                className="photo-edit"
                type="button"
              >
                <img
                  className="avatar"
                  src={getPhoto(me.photo)}
                  alt={me.username}
                />
                <div className="blur">
                  <img
                    className="photo-icon"
                    src="/static/images/icons/photo.svg"
                    alt=""
                  />
                </div>
              </button>
              {isOpen && (
                <Modal
                  onClose={() => {
                    setOpen(false)
                  }}
                >
                  <DropAndCrop
                    userId={me.id}
                    afterSave={() => {
                      setOpen(false)
                    }}
                  />
                </Modal>
              )}
            </>
          ) : (
            <>
              <div>
                <Edit>
                  <div className="username">{me.username}</div>
                  <Button
                    onClick={() => {
                      setEdit(true)
                    }}
                    type="button"
                  >
                    Редактировать
                  </Button>
                </Edit>
                <div className="email">{me.email}</div>
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
