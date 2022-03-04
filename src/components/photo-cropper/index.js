import 'react-image-crop/dist/ReactCrop.css'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Mutation } from 'react-apollo'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import Button from '../button'
import { CURRENT_USER_QUERY, USER_QUERY } from '../../lib/queries'
import { POST_PHOTO_MUTATION } from '../../lib/mutations'
import styles from './styles.css'
const Dropzone = dynamic(() => import('react-dropzone'), { ssr: false })
const imageMaxSize = 10000000 
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes
  .split(',')
  .map(type => type.trim())
const percentToPx = (a, b) => a * (b / 100)
function validateFiles(files) {
  if (files && files.length > 0) {
    const { type, size } = files[0]
    if (size > imageMaxSize) {
      console.error('Размер файла должен быть меньше 10 МБ') 
      return false
    }
    if (!acceptedFileTypesArray.includes(type)) {
      console.error('Можно выбрать только изображение') 
      return false
    }
    return true
  }
  return null
}
function PhotoCropper({ cb, userId }) {
  const [img, setImg] = useState(null)
  const [file, setFile] = useState(null)
  const [previewImg, setPreviewImg] = useState({
    naturalWidth: 0,
    naturalHeight: 0,
  })
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    aspect: 1 / 1,
    width: 0,
    height: 0,
  })
  const onDrop = acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const isVerified = validateFiles(acceptedFiles)
      if (isVerified) {
        const [firstFile] = acceptedFiles
        const reader = new FileReader()
        setFile(firstFile)
        reader.addEventListener(
          'load',
          () => {
            setImg(reader.result)
          },
          false
        )
        reader.readAsDataURL(firstFile)
      }
    }
  }
  return (
    <section className={styles.wrapper}>
      {img === null ? (
        <Dropzone
          multiple={false}
          maxSize={imageMaxSize}
          accept={acceptedFileTypes}
          onDrop={onDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <img
                src="/static/images/icons/upload.svg"
                alt="Загрузите изображение"
              />
              <p>Загрузите изображение</p>
            </div>
          )}
        </Dropzone>
      ) : (
        <Mutation
          mutation={POST_PHOTO_MUTATION}
          refetchQueries={[
            { query: USER_QUERY, variables: { id: userId } },
            { query: CURRENT_USER_QUERY },
          ]}
          variables={{
            file,
            width: percentToPx(previewImg.naturalWidth, crop.width),
            height: percentToPx(previewImg.naturalHeight, crop.height),
            x: percentToPx(previewImg.naturalWidth, crop.x),
            y: percentToPx(previewImg.naturalHeight, crop.y),
          }}
        >
          {postPhoto => (
            <div className={styles.crop}>
              <ReactCrop
                src={img}
                crop={crop}
                onImageLoaded={image => {
                  setCrop(
                    makeAspectCrop(
                      {
                        x: 0,
                        y: 0,
                        aspect: 1 / 1,
                        width: 50,
                        height: 50,
                      },
                      image.naturalWidth / image.naturalHeight
                    )
                  )
                  setPreviewImg(image)
                }}
                onChange={cropObj => {
                  setCrop(cropObj)
                }}
                keepSelection
              />
              <div className={styles.buttons}>
                <Button
                  className={styles['other-photo-button']}
                  onClick={() => {
                    setImg(null)
                  }}
                >
                  Другое фото
                </Button>
                <Button
                  violet
                  onClick={async () => {
                    await postPhoto()
                    cb()
                  }}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </Mutation>
      )}
    </section>
  )
}
export default PhotoCropper
