const fs = require('fs')
const { join } = require('path')
const { parse } = require('url')
const Fastify = require('fastify')({
  http2: true,
  https: {
    allowHTTP1: true,
    key: fs.readFileSync(join(__dirname, 'shortstories.key')),
    cert: fs.readFileSync(join(__dirname, 'shortstories.crt')),
  },
  logger: { level: 'error' },
})
const Next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const sourcemapsForSentryOnly = token => (req, res, next) => {
  if (!dev && !!token && req.headers['x-sentry-token'] !== token) {
    res
      .status(401)
      .send('Authentication access token is required to access the source map.')
    return
  }
  next()
}
Fastify.register((fastify, opts, next) => {
  const app = Next({ dev })
  app
    .prepare()
    .then(() => {
      const { Sentry } = require('./src/lib/with-sentry')({ 
        release: app.buildId,
      })
      fastify.register(require('fastify-compress')) 
      if (dev) {
        fastify.get('/_next/*', (req, reply) =>
          app.handleRequest(req.req, reply.res).then(() => {
            reply.sent = true
          })
        )
      }
      fastify.get(/\.map$/, (req, reply, next) => {
        sourcemapsForSentryOnly(process.env.SENTRY_TOKEN)(
          req.req,
          reply.res,
          next
        )
      })
      fastify.get('/user/:id', (req, reply) => {
        const actualPage = '/user'
        const [userId] = req.params.id.split('-')
        const queryParams = { id: userId }
        return app
          .render(req.req, reply.res, actualPage, queryParams)
          .then(() => {
            reply.sent = true
          })
      })
      fastify.get('/story/:id', (req, reply) => {
        const actualPage = '/story'
        const [storyId] = req.params.id.split('-')
        const queryParams = { id: storyId }
        return app
          .render(req.req, reply.res, actualPage, queryParams)
          .then(() => {
            reply.sent = true
          })
      })
      fastify.get('/edit-story/:id', (req, reply) => {
        const actualPage = '/edit-story'
        const [storyId] = req.params.id.split('-')
        const queryParams = { id: storyId }
        return app
          .render(req.req, reply.res, actualPage, queryParams)
          .then(() => {
            reply.sent = true
          })
      })
      fastify.get('/*', (req, reply) => {
        const parsedUrl = parse(req.req.url, true)
        const { pathname } = parsedUrl
        if (pathname === '/service-worker.js') {
          const filePath = join(__dirname, '.next', pathname)
          return app.serveStatic(req.req, reply.res, filePath).then(() => {
            reply.sent = true
          })
        }
        return app.handleRequest(req.req, reply.res).then(() => {
          reply.sent = true
        })
      })
      fastify.setNotFoundHandler((req, reply) =>
        app.render404(req.req, reply.res).then(() => {
          reply.sent = true
        })
      )
      next()
    })
    .catch(err => next(err))
})
Fastify.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on https:
})
