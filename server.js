const express = require('express')
const next = require('next')
const compression = require('compression')
const { join } = require('path')
const { parse } = require('url')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const sourcemapsForSentryOnly = token => (req, res, next) => {
  if (!dev && !!token && req.headers['x-sentry-token'] !== token) {
    res
      .status(401)
      .send('Authentication access token is required to access the source map.')
    return
  }
  next()
}
app.prepare().then(() => {
  const server = express()
  const { Sentry } = require('./src/lib/with-sentry')({ release: app.buildId }) 
  server.use(compression())
  server
    .use(Sentry.Handlers.requestHandler())
    .get(/\.map$/, sourcemapsForSentryOnly(process.env.SENTRY_TOKEN))
    .use(Sentry.Handlers.errorHandler())
  server.get('/user/:id', (req, res) => {
    const actualPage = '/user'
    const [userId] = req.params.id.split('-')
    const queryParams = { id: userId }
    app.render(req, res, actualPage, queryParams)
  })
  server.get('/story/:id', (req, res) => {
    const actualPage = '/story'
    const [storyId] = req.params.id.split('-')
    const queryParams = { id: storyId }
    app.render(req, res, actualPage, queryParams)
  })
  server.get('/edit-story/:id', (req, res) => {
    const actualPage = '/edit-story'
    const [storyId] = req.params.id.split('-')
    const queryParams = { id: storyId }
    app.render(req, res, actualPage, queryParams)
  })
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)
      app.serveStatic(req, res, filePath)
    } else {
      handle(req, res, parsedUrl)
    }
  })
  server.listen(port, err => {
    if (err) throw new Error(err)
    console.log(`> Ready on http:
  })
})
