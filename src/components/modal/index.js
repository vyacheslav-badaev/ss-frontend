import './global.css'
import React from 'react'
import onClickOutside from 'react-onclickoutside'
import Portal from '../portal'
import styles from './styles.css'
function ModalContent({ onClose, children }) {
  ModalContent.handleClickOutside = onClose
  return (
    <div className={styles.content}>
      <button
        className={styles['close-button']}
        onClick={onClose}
        type="button"
      >
        <img src="/static/images/icons/cross.svg" alt="Закрыть окно" />
      </button>
      {children}
    </div>
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
      <div className={styles.overlay}>
        <ModalContentWithOutsideClick onClose={onClose}>
          {children}
        </ModalContentWithOutsideClick>
      </div>
    </Portal>
  )
}
export default Modal
