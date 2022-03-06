import React, { useEffect } from 'react'
import Meta from './meta'
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
      <Meta />
      {children}
    </>
  )
}
export default Page
