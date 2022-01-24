import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { Global, css } from '@emotion/core'
class MyDocument extends Document {
  render() {
    return (
      <html lang="ru" prefix="og: http:
        <Head />
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
        <body>
          <noscript>
            <div>
              <img
                src="https:
                style={{
                  position: 'absolute',
                  left: -9999,
                }}
                alt=""
              />
            </div>
          </noscript>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </html>
    )
  }
}
export default MyDocument
