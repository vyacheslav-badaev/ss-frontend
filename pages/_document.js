import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <html lang="ru" prefix="og: http:
        <Head />
        <body>
          {}
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </html>
    )
  }
}
export default MyDocument
