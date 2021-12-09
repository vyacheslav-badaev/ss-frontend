import Head from 'next/head'
import { withRouter } from 'next/router'
const pageWithCustomMeta = ['/story', '/create-story']
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
          <meta
            name="title"
            content="Shortstories - читать рассказы авторов из народа или написать рассказ и
        стать лучшим автором"
          />
          <meta
            name="description"
            content="Читать любительские рассказы, писать рассказы и стать лучшим автором можно только на Shortstories"
          />
          <meta
            property="og:site_name"
            content="Shortstories - читать рассказы авторов из народа или написать рассказ и
        стать лучшим автором"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https:
          <meta
            property="og:title"
            content="Shortstories - читать рассказы авторов из народа или написать рассказ и
        стать лучшим автором"
          />
          <meta
            property="og:description"
            content="Читать любительские рассказы, писать рассказы и стать лучшим автором можно только на Shortstories"
          />
          <meta
            name="twitter:title"
            content="Shortstories - читать рассказы авторов из народа или написать рассказ и
        стать лучшим автором"
          />
          <meta
            name="twitter:text:title"
            content="Shortstories - читать рассказы авторов из народа или написать рассказ и
        стать лучшим автором"
          />
          <meta
            name="twitter:description"
            content="Читать любительские рассказы, писать рассказы и стать лучшим автором можно только на Shortstories"
          />
          <title>
            Shortstories - читать рассказы авторов из народа или написать
            рассказ и стать лучшим автором
          </title>
        </>
      )}
      <meta name="keywords" content="" />
      <link rel="manifest" href="/static/other/manifest.json" />
      <meta name="theme-color" content="#766ac3" />
      <meta
        property="og:image"
        content="https:
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:url"
        content="https:
      />
      <meta
        name="twitter:image:src"
        content="https:
      />
      <link
        rel="image_src"
        href="https:
      />
      <link rel="shortcut icon" href="/static/images/icons/favicon.png" />
      <link rel="apple-touch-icon" href="/static/images/icons/favicon.png" />
      <meta
        name="apple-mobile-web-app-title"
        content="Shortstories - читать рассказы авторов из народа или написать рассказ и
        стать лучшим автором"
      />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link
        rel="dns-prefetch"
        href="https:
        crossOrigin="anonymous"
      />
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
        type="text/javascript"
        src="/static/scripts/google-fonts-fast-render.js"
      />
      <script type="text/javascript" src="/static/scripts/yandex-metrika.js" />
      <link rel="stylesheet" href="/static/styles/global.css" />
    </Head>
  )
}
export default withRouter(Meta)
