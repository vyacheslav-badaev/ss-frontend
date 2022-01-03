import React from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import onClickOutside from 'react-onclickoutside'
import Portal from './portal'
import { fadeIn } from '../shared-styles/animations'
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2000;
  animation: ${fadeIn} 0.25s ease-in-out;
  @media (max-width: 768px) {
    background: transparent;
  }
`
const Content = styled.section`
  position: fixed;
  background: ${props => props.theme.white};
  border-radius: 8px;
  min-width: 200px;
  min-height: 200px;
  padding: 50px 24px 24px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    transform: initial;
    top: 0;
    left: 0;
  }
  .close-button {
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
`
function ModalContent({ onClose, children }) {
  ModalContent.handleClickOutside = onClose
  return (
    <Content>
      <button className="close-button" onClick={onClose} type="button">
        <img src="/static/images/icons/cross.svg" alt="Закрыть окно" />
      </button>
      {children}
    </Content>
  )
}
const clickOutsideConfig = {
  handleClickOutside: () => ModalContent.handleClickOutside,
}
const ModalContentWithOutsideClick = onClickOutside(
  ModalContent,
  clickOutsideConfig
)
function Modal({ onClose, children }) {
  Modal.handleClickOutside = onClose
  return (
    <Portal selector="#modal">
      <Wrapper>
        <ModalContentWithOutsideClick onClose={onClose}>
          {children}
        </ModalContentWithOutsideClick>
        <Global
          styles={css`
            body {
              overflow-y: hidden;
            }
          `}
        />
      </Wrapper>
    </Portal>
  )
}
export default Modal
