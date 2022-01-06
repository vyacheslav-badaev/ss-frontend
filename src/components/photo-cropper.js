import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { Mutation } from 'react-apollo'
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import Button from './button'
import { CURRENT_USER_QUERY, USER_QUERY } from '../lib/queries'
import { POST_PHOTO_MUTATION } from '../lib/mutations'
const Dropzone = dynamic(() => import('react-dropzone'), { ssr: false })
const imageMaxSize = 10000000 
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes
  .split(',')
  .map(type => type.trim())
const percentToPx = (a, b) => a * (b / 100)
const Wrapper = styled.section`
  min-width: 400px;
`
const OtherPhotoButton = styled(Button)`
  background-color: transparent;
  color: ${props => props.theme.black};
  &:hover {
    background-color: transparent;
  }
`
const CropStyles = styled.div`
  display: flex;
  flex-direction: column;
  .buttons {
    display: flex;
    width: 100%;
    margin-top: 24px;
    > button {
      flex: 1;
    }
  }
`
const StyledDropzone = styled.div`
  outline: none;
  width: 480px;
  height: 400px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  img {
    width: 80px;
    height: 80px;
  }
`
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
    <Wrapper>
      {img === null ? (
        <Dropzone
          multiple={false}
          maxSize={imageMaxSize}
          accept={acceptedFileTypes}
          onDrop={onDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <StyledDropzone {...getRootProps({ refKey: 'ref' })}>
              <input {...getInputProps()} />
              <img
                src="/static/images/icons/upload.svg"
                alt="Загрузите изображение"
              />
              <p>Загрузите изображение</p>
            </StyledDropzone>
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
            <CropStyles>
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
              <div className="buttons">
                <OtherPhotoButton
                  type="button"
                  onClick={() => {
                    setImg(null)
                  }}
                >
                  Другое фото
                </OtherPhotoButton>
                <Button
                  violet
                  type="button"
                  onClick={async () => {
                    await postPhoto()
                    cb()
                  }}
                >
                  Сохранить
                </Button>
              </div>
            </CropStyles>
          )}
        </Mutation>
      )}
    </Wrapper>
  )
}
export default PhotoCropper
