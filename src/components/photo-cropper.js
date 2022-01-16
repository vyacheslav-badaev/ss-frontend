import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Global, css } from '@emotion/core'
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
    <>
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
      <Global
        styles={css`
          .ReactCrop {
            position: relative;
            display: inline-block;
            cursor: crosshair;
            overflow: hidden;
            max-width: 100%;
            background-color: #000;
          }
          .ReactCrop:focus {
            outline: none;
          }
          .ReactCrop--disabled,
          .ReactCrop--locked {
            cursor: inherit;
          }
          .ReactCrop__image {
            display: block;
            max-width: 100%;
            max-height: 600px;
            margin: 0 auto;
          }
          .ReactCrop--crop-invisible .ReactCrop__image {
            opacity: 0.5;
          }
          .ReactCrop__crop-selection {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate3d(0, 0, 0);
            box-sizing: border-box;
            cursor: move;
            box-shadow: 0 0 0 9999em rgba(0, 0, 0, 0.5);
            border: 1px solid;
            border-image-source: url(data:image/gif;base64,R0lGODlhCgAKAJECAAAAAP
            border-image-slice: 1;
            border-image-repeat: repeat;
          }
          .ReactCrop--disabled .ReactCrop__crop-selection {
            cursor: inherit;
          }
          .ReactCrop__drag-handle {
            position: absolute;
            width: 9px;
            height: 9px;
            background-color: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.7);
            box-sizing: border-box;
            outline: 1px solid transparent;
          }
          .ReactCrop .ord-nw {
            top: 0;
            left: 0;
            margin-top: -5px;
            margin-left: -5px;
            cursor: nw-resize;
          }
          .ReactCrop .ord-n {
            top: 0;
            left: 50%;
            margin-top: -5px;
            margin-left: -5px;
            cursor: n-resize;
          }
          .ReactCrop .ord-ne {
            top: 0;
            right: 0;
            margin-top: -5px;
            margin-right: -5px;
            cursor: ne-resize;
          }
          .ReactCrop .ord-e {
            top: 50%;
            right: 0;
            margin-top: -5px;
            margin-right: -5px;
            cursor: e-resize;
          }
          .ReactCrop .ord-se {
            bottom: 0;
            right: 0;
            margin-bottom: -5px;
            margin-right: -5px;
            cursor: se-resize;
          }
          .ReactCrop .ord-s {
            bottom: 0;
            left: 50%;
            margin-bottom: -5px;
            margin-left: -5px;
            cursor: s-resize;
          }
          .ReactCrop .ord-sw {
            bottom: 0;
            left: 0;
            margin-bottom: -5px;
            margin-left: -5px;
            cursor: sw-resize;
          }
          .ReactCrop .ord-w {
            top: 50%;
            left: 0;
            margin-top: -5px;
            margin-left: -5px;
            cursor: w-resize;
          }
          .ReactCrop__disabled .ReactCrop__drag-handle {
            cursor: inherit;
          }
          .ReactCrop__drag-bar {
            position: absolute;
          }
          .ReactCrop__drag-bar.ord-n {
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            margin-top: -3px;
          }
          .ReactCrop__drag-bar.ord-e {
            right: 0;
            top: 0;
            width: 6px;
            height: 100%;
            margin-right: -3px;
          }
          .ReactCrop__drag-bar.ord-s {
            bottom: 0;
            left: 0;
            width: 100%;
            height: 6px;
            margin-bottom: -3px;
          }
          .ReactCrop__drag-bar.ord-w {
            top: 0;
            left: 0;
            width: 6px;
            height: 100%;
            margin-left: -3px;
          }
          .ReactCrop--new-crop .ReactCrop__drag-bar,
          .ReactCrop--new-crop .ReactCrop__drag-handle,
          .ReactCrop--fixed-aspect .ReactCrop__drag-bar {
            display: none;
          }
          .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-n,
          .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-e,
          .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-s,
          .ReactCrop--fixed-aspect .ReactCrop__drag-handle.ord-w {
            display: none;
          }
          @media (max-width: 768px), (pointer: coarse) {
            .ReactCrop__drag-handle {
              width: 17px;
              height: 17px;
            }
            .ReactCrop .ord-nw {
              margin-top: -9px;
              margin-left: -9px;
            }
            .ReactCrop .ord-n {
              margin-top: -9px;
              margin-left: -9px;
            }
            .ReactCrop .ord-ne {
              margin-top: -9px;
              margin-right: -9px;
            }
            .ReactCrop .ord-e {
              margin-top: -9px;
              margin-right: -9px;
            }
            .ReactCrop .ord-se {
              margin-bottom: -9px;
              margin-right: -9px;
            }
            .ReactCrop .ord-s {
              margin-bottom: -9px;
              margin-left: -9px;
            }
            .ReactCrop .ord-sw {
              margin-bottom: -9px;
              margin-left: -9px;
            }
            .ReactCrop .ord-w {
              margin-top: -9px;
              margin-left: -9px;
            }
            .ReactCrop__drag-bar.ord-n {
              height: 14px;
              margin-top: -7px;
            }
            .ReactCrop__drag-bar.ord-e {
              width: 14px;
              margin-right: -7px;
            }
            .ReactCrop__drag-bar.ord-s {
              height: 14px;
              margin-bottom: -7px;
            }
            .ReactCrop__drag-bar.ord-w {
              width: 14px;
              margin-left: -7px;
            }
          }
        `}
      />
    </>
  )
}
export default PhotoCropper
