import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Mutation } from 'react-apollo'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import Button from './button'
import { meFragment, userFragment } from '../lib/fragments'
import { POST_PHOTO_MUTATION } from '../lib/mutations'
import styles from './styles/photo-cropper.css'
const Dropzone = dynamic(() => import('react-dropzone'), { ssr: false })
const imageMaxSize = 10000000 
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes
  .split(',')
  .map(type => type.trim())
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
    width: 120,
    height: 120,
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
          false,
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
          update={(cache, mutationResult) => {
            const me = cache.readFragment({
              id: 'Me',
              fragment: meFragment,
            })
            const user = cache.readFragment({
              id: `User:${userId}`,
              fragment: userFragment,
            })
            cache.writeFragment({
              id: 'Me',
              fragment: meFragment,
              data: {
                ...me,
                photo: mutationResult.data.postPhoto.photo,
              },
            })
            if (Object.keys(user).length > 0) {
              cache.writeFragment({
                id: `User:${userId}`,
                fragment: userFragment,
                data: {
                  ...user,
                  photo: mutationResult.data.postPhoto.photo,
                },
              })
            }
          }}
          variables={{
            file,
            width: crop.width * (previewImg.naturalWidth / previewImg.width),
            height:
              crop.height * (previewImg.naturalHeight / previewImg.height),
            x: crop.x * (previewImg.naturalWidth / previewImg.width),
            y: crop.y * (previewImg.naturalHeight / previewImg.height),
          }}
        >
          {(postPhoto, { loading }) => (
            <div className={styles.crop}>
              <ReactCrop
                minHeight={120}
                minWidth={120}
                src={img}
                crop={crop}
                onImageLoaded={image => {
                  setCrop(
                    makeAspectCrop(
                      {
                        x: 0,
                        y: 0,
                        aspect: 1 / 1,
                        width: 120,
                        height: 120,
                      },
                      image.naturalWidth / image.naturalHeight,
                    ),
                  )
                  setPreviewImg(image)
                }}
                onChange={cropObj => {
                  setCrop(cropObj)
                }}
                keepSelection
              />
              <div className={styles.buttons}>
                <button
                  type="button"
                  className={styles['other-photo-button']}
                  onClick={() => {
                    setImg(null)
                  }}
                >
                  Другое фото
                </button>
                <Button
                  black
                  onClick={async () => {
                    await postPhoto()
                    cb()
                  }}
                  loading={loading}
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
