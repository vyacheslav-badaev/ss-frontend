import React, { useEffect } from 'react'
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import Meta from './meta'
const theme = {
  black: '#272727',
  white: '#fcfcfc',
  yellow: '#ffc600',
  softViolet: '#6d47d9',
  pink: '#f4c4f3',
  red: '#f01',
  lightGrey: '#eee',
  darkGrey: '#aaa',
  nightGrey: '#b8b8b8',
  uiFont: 'PT Sans, sans-serif',
  textFont: 'PT Serif, serif',
  logoFont: 'Kaushan Script, cursive',
  boxShadow: '0 1px 16px rgba(0, 0, 0, 0.25)',
}
function Page({ children }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('service worker registration successful') 
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message) 
        })
    }
  })
  return (
    <>
      <ThemeProvider theme={theme}>
        <Meta />
        {children}
      </ThemeProvider>
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
export default Page
