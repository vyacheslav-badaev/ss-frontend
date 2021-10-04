import React, { useEffect } from 'react'
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { node } from 'prop-types'
import Meta from './Meta'
const theme = {
  black: '#272727',
  white: '#fcfcfc',
  yellow: '#ffc600',
  softViolet: '#6d47d9',
  pink: '#f4c4f3',
  red: '#f00',
  lightGrey: '#eee',
  darkGrey: '#aaa',
  nightGrey: '#b8b8b8',
  uiFont: 'Montserrat, sans-serif',
  textFont: 'Alegreya, serif',
  logoFont: 'Pacifico, cursive',
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
          *,
          ::before,
          ::after {
            background-repeat: no-repeat;
            box-sizing: border-box;
          }
          ::before,
          ::after {
            text-decoration: inherit;
            vertical-align: inherit;
          }
          html {
            cursor: default;
            font-family: Montserrat, system-ui, -apple-system, Segoe UI, Roboto,
              Ubuntu, Cantarell, Noto Sans, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            line-height: 1.15;
            -moz-tab-size: 4;
            tab-size: 4;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            word-break: break-word;
          }
          body {
            font-size: 1.5rem;
            margin: 0;
          }
          h1 {
            font-size: 2em;
            margin: 0.67em 0;
          }
          hr {
            height: 0;
            overflow: visible;
          }
          main {
            display: block;
          }
          nav ol,
          nav ul {
            list-style: none;
          }
          pre {
            font-family: Menlo, Consolas, Roboto Mono, Ubuntu Monospace,
              Noto Mono, Oxygen Mono, Liberation Mono, monospace;
            font-size: 1em;
          }
          a {
            background-color: transparent;
            text-decoration: none;
            color: #6d47d9;
            font-weight: 700;
          }
          abbr[title] {
            text-decoration: underline;
            text-decoration: underline dotted;
          }
          b,
          strong {
            font-weight: bolder;
          }
          code,
          kbd,
          samp {
            font-family: Menlo, Consolas, Roboto Mono, Ubuntu Monospace,
              Noto Mono, Oxygen Mono, Liberation Mono, monospace;
            font-size: 1em;
          }
          small {
            font-size: 80%;
          }
          ::-moz-selection {
            background-color: #b3d4fc;
            color: #000;
            text-shadow: none;
          }
          ::selection {
            background-color: #b3d4fc;
            color: #000;
            text-shadow: none;
          }
          audio,
          canvas,
          iframe,
          img,
          svg,
          video {
            vertical-align: middle;
          }
          audio,
          video {
            display: inline-block;
          }
          audio:not([controls]) {
            display: none;
            height: 0;
          }
          img {
            border-style: none;
          }
          svg:not([fill]) {
            fill: currentColor;
          }
          svg:not(:root) {
            overflow: hidden;
          }
          table {
            border-collapse: collapse;
          }
          button,
          input,
          select,
          textarea {
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
          }
          button,
          input,
          select {
            margin: 0;
          }
          button {
            overflow: visible;
            text-transform: none;
          }
          button,
          [type='button'],
          [type='reset'],
          [type='submit'] {
            -webkit-appearance: button;
          }
          fieldset {
            padding: 0.35em 0.75em 0.625em;
          }
          input {
            overflow: visible;
          }
          legend {
            color: inherit;
            display: table;
            max-width: 100%;
            white-space: normal;
          }
          progress {
            display: inline-block;
            vertical-align: baseline;
          }
          select {
            text-transform: none;
          }
          textarea {
            margin: 0;
            overflow: auto;
            resize: vertical;
          }
          [type='checkbox'],
          [type='radio'] {
            padding: 0;
          }
          [type='search'] {
            -webkit-appearance: textfield;
            outline-offset: -2px;
          }
          ::-webkit-inner-spin-button,
          ::-webkit-outer-spin-button {
            height: auto;
          }
          ::-webkit-input-placeholder {
            color: inherit;
            opacity: 0.54;
          }
          ::-webkit-search-decoration {
            -webkit-appearance: none;
          }
          ::-webkit-file-upload-button {
            -webkit-appearance: button;
            font: inherit;
          }
          ::-moz-focus-inner {
            border-style: none;
            padding: 0;
          }
          :-moz-focusring {
            outline: 1px dotted ButtonText;
          }
          details {
            display: block;
          }
          dialog {
            background-color: #fff;
            border: solid;
            color: #000;
            display: block;
            height: -moz-fit-content;
            height: -webkit-fit-content;
            height: fit-content;
            left: 0;
            margin: auto;
            padding: 1em;
            position: absolute;
            right: 0;
            width: -moz-fit-content;
            width: -webkit-fit-content;
            width: fit-content;
          }
          dialog:not([open]) {
            display: none;
          }
          summary {
            display: list-item;
          }
          canvas {
            display: inline-block;
          }
          template {
            display: none;
          }
          a,
          area,
          button,
          input,
          label,
          select,
          summary,
          textarea,
          [tabindex] {
            -ms-touch-action: manipulation;
            touch-action: manipulation;
          }
          [hidden] {
            display: none;
          }
          [aria-busy='true'] {
            cursor: progress;
          }
          [aria-controls] {
            cursor: pointer;
          }
          [aria-disabled='true'],
          [disabled] {
            cursor: not-allowed;
          }
          [aria-hidden='false'][hidden]:not(:focus) {
            clip: rect(0, 0, 0, 0);
            display: inherit;
            position: absolute;
          }
          @keyframes nprogress-spinner {
            0% {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          :root {
            font-size: 10px;
          }
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-tap-highlight-color: transparent;
            outline: 0;
          }
          html {
            height: 100%;
          }
          body {
            font-size: 1.5rem;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p {
            margin: 0;
          }
          h1 {
            font-size: 4.8rem;
            line-height: 4.8rem;
          }
          h2 {
            font-size: 4rem;
            line-height: 4rem;
          }
          h3 {
            font-size: 3.2rem;
            line-height: 3.2rem;
          }
          h4 {
            font-size: 2.4rem;
            line-height: 2.4rem;
          }
          h5 {
            font-size: 1.6rem;
            line-height: 1.6rem;
          }
          h6 {
            font-size: 0.8rem;
            line-height: 0.8rem;
          }
          button,
          ul {
            padding: 0;
            margin: 0;
          }
          ul {
            list-style-type: none;
          }
          button {
            cursor: pointer;
            background-color: transparent;
            border: 0;
            text-transform: uppercase;
          }
          button:disabled {
            cursor: not-allowed;
            pointer-events: none;
            opacity: 0.7;
          }
          #nprogress {
            pointer-events: none;
          }
          #nprogress .bar {
            background: #6d47d9;
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
          }
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #6d47d9, 0 0 5px #6d47d9;
            opacity: 1;
            transform: rotate(3deg) translate(0, -4px);
          }
          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px;
          }
          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;
            border: solid 2px transparent;
            border-top-color: #6d47d9;
            border-left-color: #6d47d9;
            border-radius: 50%;
            animation: nprogress-spinner 400ms linear infinite;
          }
          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }
          .nprogress-custom-parent #nprogress .bar,
          .nprogress-custom-parent #nprogress .spinner {
            position: absolute;
          }
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
            max-height: fill-available;
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
Page.propTypes = {
  children: node.isRequired,
}
export default Page
