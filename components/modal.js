import React from 'react'
import { Global, css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import onClickOutside from 'react-onclickoutside'
import { func, node } from 'prop-types'
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2;
  animation: ${fadeIn} 0.25s ease-in-out;
`
const Content = styled.section`
  position: fixed;
  background: ${props => props.theme.white};
  border-radius: 8px;
  min-width: 200px;
  min-height: 200px;
  padding: 50px 20px 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
ModalContent.propTypes = {
  onClose: func.isRequired,
  children: node.isRequired,
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
  )
}
Modal.propTypes = {
  onClose: func.isRequired,
  children: node.isRequired,
}
export default Modal
