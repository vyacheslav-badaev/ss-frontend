import React, { useState } from 'react'
import styled from '@emotion/styled'
import Modal from './modal'
import DropAndCrop from './DropAndCrop'
import getPhoto from '../lib/get-photo'
const Button = styled.button`
  cursor: pointer;
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  outline: none;
  width: 120px;
  height: 120px;
`
const PhotoIcon = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 40px;
  left: 40px;
  right: 0;
  bottom: 0;
`
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`
const Blur = styled.div`
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
`
function EditPhoto({ me }) {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        type="button"
      >
        <Avatar src={getPhoto(me.photo)} alt={me.username} />
        <Blur>
          <PhotoIcon
            className="photo-icon"
            src="/static/images/icons/photo.svg"
            alt=""
          />
        </Blur>
      </Button>
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
  )
}
export default EditPhoto
