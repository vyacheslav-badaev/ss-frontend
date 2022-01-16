import React, { useEffect } from 'react'
import { Global, css, jsx } from '@emotion/core'
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
      <Global
        styles={css`
          @import 'https:
          :root {
            font-size: 10px;
          }
          html {
            cursor: default;
            box-sizing: border-box;
            height: 100%;
            line-height: 1.15;
            tab-size: 4;
            font-family: 'PT Sans', system-ui, -apple-system, Segoe UI, Roboto,
              Ubuntu, Cantarell, Noto Sans, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
            word-break: break-word;
          }
          *,
          *::before,
          *::after {
            box-sizing: inherit;
            outline: 0;
            background-repeat: no-repeat;
          }
          body {
            font-size: 1.5rem;
            margin: 0;
          }
          main {
            display: block;
            position: relative;
            min-height: 100%;
            color: #272727;
          }
          a {
            background-color: transparent;
            text-decoration: none;
            color: #6d47d9;
            font-weight: 700;
          }
          button,
          input,
          textarea {
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
          }
          textarea {
            margin: 0;
            overflow: auto;
            resize: none;
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
          }
          button:disabled {
            cursor: not-allowed;
            opacity: 0.7;
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <Meta />
        {children}
      </ThemeProvider>
    </>
  )
}
export default Page
