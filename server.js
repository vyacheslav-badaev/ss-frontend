const express = require('express')
const compression = require('compression')
const next = require('next')
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
app.prepare().then(() => {
  const server = express()
  server.use(compression())
  server.get('/user/:id', (req, res) =>
    app.render(req, res, '/user', { id: getId(req) }),
  )
  server.get('/story/:id', (req, res) =>
    app.render(req, res, '/story', { id: getId(req) }),
  )
  server.get('/edit-story/:id', (req, res) =>
    app.render(req, res, '/edit-story', { id: getId(req) }),
  )
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)
      return app.serveStatic(req, res, filePath)
    }
    return handle(req, res, parsedUrl)
  })
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http:
  })
})
