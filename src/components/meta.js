import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
const pageWithCustomMeta = ['/story', '/create-story']
const title =
  'Shortstories - читать рассказы авторов из народа или написать рассказ и стать лучшим автором'
const description =
  'Читать любительские рассказы, писать рассказы и стать лучшим автором можно только на Shortstories'
const url = 'https:
const shareImage = 'https:
const favicon = '/static/icons/favicon.png'
function Meta({ router }) {
  const page = router.pathname
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta charSet="utf-8" />
      {!pageWithCustomMeta.includes(page) && (
        <>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta property="og:site_name" content={title} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:text:title" content={title} />
          <meta name="twitter:description" content={description} />
          <title>{title}</title>
        </>
      )}
      <meta name="keywords" content="" />
      <link rel="manifest" href="/static/other/manifest.webmanifest" />
      <meta name="theme-color" content="#fffae0" />
      <meta
        property="og:image"
        content="https:
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={shareImage} />
      <meta name="twitter:image:src" content={shareImage} />
      <link rel="image_src" href={shareImage} />
      <link rel="shortcut icon" href={favicon} />
      <link rel="apple-touch-icon" href={favicon} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="dns-prefetch" href="https:
      <link
        rel="preconnect"
        href="https:
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https:
        as="fetch"
        crossOrigin="anonymous"
      />
      <script
        defer
        type="text/javascript"
        src="/static/scripts/google-fonts-fast-render.js"
      />
      <script
        async
        type="text/javascript"
        src="/static/scripts/yandex-metrika.js"
      />
    </Head>
  )
}
export default withRouter(Meta)
