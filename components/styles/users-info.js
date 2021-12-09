import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
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
  letter-spacing: 0.5px;
  &:hover {
    background-color: #5c32d5;
  }
`
export const Wrapper = styled.section`
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
export const FieldWrapper = styled.div`
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
export const EditForm = styled.form`
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
