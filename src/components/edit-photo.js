import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import PhotoCropper from './photo-cropper'
import { getPhoto } from '../lib/helpers'
import styles from './styles/edit-photo.css'
const Modal = dynamic(() => import('./modal'), { ssr: false })
function EditPhoto({ me }) {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <button
        className={styles.button}
        onClick={() => {
          setOpen(true)
        }}
        type="button"
      >
        <img
          className={styles.avatar}
          src={getPhoto(me.photo)}
          alt={me.username}
        />
        <div className={styles.blur}>
          <img
            className={styles['photo-icon']}
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
          <PhotoCropper
            userId={me.id}
            cb={() => {
              setOpen(false)
            }}
          />
        </Modal>
      )}
    </>
  )
}
export default EditPhoto
