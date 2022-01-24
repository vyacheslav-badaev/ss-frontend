import React, { useEffect } from 'react'
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
    <ThemeProvider theme={theme}>
      <Meta />
      {children}
    </ThemeProvider>
  )
}
export default Page
