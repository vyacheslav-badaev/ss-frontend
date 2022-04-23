const next = require('next')
const http2 = require('http2')
const fs = require('fs')
const compression = require('./compression')
const { parse } = require('url')
const { join } = require('path')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
function getId(req) {
  const [id] = req.params.id.split('-')
  return id
}
const options = {
  key: fs.readFileSync('shortstories.crt'),
  cert: fs.readFileSync('shortstories.key'),
}
const server = http2.createSecureServer(options)
const compressionMiddleware = compression()
app.prepare().then(() => {
  server.on('error', err => console.error(err))
  server.on('request', (req, res) => {
    return compressionMiddleware(req, res, () => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl
      if (pathname === '/service-worker.js') {
        const filePath = join(__dirname, '.next', pathname)
        return app.serveStatic(req, res, filePath)
      }
      switch (req.url) {
        case '/user/:id':
          return app.render(req, res, '/user', { id: getId(req) })
        case '/story/:id':
          return app.render(req, res, '/story', { id: getId(req) })
        case '/edit-story/:id':
          return app.render(req, res, '/edit-story', { id: getId(req) })
        default:
          return handle(req, res, parsedUrl)
      }
    })
  })
  server.listen(port)
  console.log(`Listening on HTTPS port ${port}`)
})
