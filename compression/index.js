var accepts = require('accepts')
var Buffer = require('safe-buffer').Buffer
var bytes = require('bytes')
var compressible = require('compressible')
var debug = require('debug')('compression')
var onHeaders = require('on-headers')
var vary = require('vary')
var zlib = require('zlib')
module.exports = compression
module.exports.filter = shouldCompress
var cacheControlNoTransformRegExp = /(?:^|,)\s*?no-transform\s*?(?:,|$)/
function compression(options) {
  var opts = options || {}
  var filter = opts.filter || shouldCompress
  var threshold = bytes.parse(opts.threshold)
  if (threshold == null) {
    threshold = 1024
  }
  return function compression(req, res, next) {
    var ended = false
    var length
    var listeners = []
    var stream
    var _end = res.end
    var _on = res.on
    var _write = res.write
    res.flush = function flush() {
      if (stream) {
        stream.flush()
      }
    }
    res.write = function write(chunk, encoding) {
      if (ended) {
        return false
      }
      if (!this._header && !this.headersSent) {
        this.writeHead(this.statusCode)
      }
      return stream
        ? stream.write(toBuffer(chunk, encoding))
        : _write.call(this, chunk, encoding)
    }
    res.end = function end(chunk, encoding) {
      if (ended) {
        return false
      }
      if (!this._header) {
        if (!this.getHeader('Content-Length')) {
          length = chunkLength(chunk, encoding)
        }
        if (!res.headersSent) {
          res.writeHead(res.statusCode)
        }
      }
      if (!stream) {
        return _end.call(this, chunk, encoding)
      }
      ended = true
      return chunk ? stream.end(toBuffer(chunk, encoding)) : stream.end()
    }
    res.on = function on(type, listener) {
      if (!listeners || type !== 'drain') {
        return _on.call(this, type, listener)
      }
      if (stream) {
        return stream.on(type, listener)
      }
      listeners.push([type, listener])
      return this
    }
    function nocompress(msg) {
      debug('no compression: %s', msg)
      addListeners(res, _on, listeners)
      listeners = null
    }
    onHeaders(res, function onResponseHeaders() {
      if (!filter(req, res)) {
        nocompress('filtered')
        return
      }
      if (!shouldTransform(req, res)) {
        nocompress('no transform')
        return
      }
      vary(res, 'Accept-Encoding')
      if (
        Number(res.getHeader('Content-Length')) < threshold ||
        length < threshold
      ) {
        nocompress('size below threshold')
        return
      }
      var encoding = res.getHeader('Content-Encoding') || 'identity'
      if (encoding !== 'identity') {
        nocompress('already encoded')
        return
      }
      if (req.method === 'HEAD') {
        nocompress('HEAD request')
        return
      }
      var accept = accepts(req)
      var method = accept.encoding(['gzip', 'deflate', 'identity'])
      if (method === 'deflate' && accept.encoding(['gzip'])) {
        method = accept.encoding(['gzip', 'identity'])
      }
      if (!method || method === 'identity') {
        nocompress('not acceptable')
        return
      }
      debug('%s compression', method)
      stream =
        method === 'gzip' ? zlib.createGzip(opts) : zlib.createDeflate(opts)
      addListeners(stream, stream.on, listeners)
      res.setHeader('Content-Encoding', method)
      res.removeHeader('Content-Length')
      stream.on('data', function onStreamData(chunk) {
        if (_write.call(res, chunk) === false) {
          stream.pause()
        }
      })
      stream.on('end', function onStreamEnd() {
        _end.call(res)
      })
      _on.call(res, 'drain', function onResponseDrain() {
        stream.resume()
      })
    })
    next()
  }
}
function addListeners(stream, on, listeners) {
  for (var i = 0; i < listeners.length; i++) {
    on.apply(stream, listeners[i])
  }
}
function chunkLength(chunk, encoding) {
  if (!chunk) {
    return 0
  }
  return !Buffer.isBuffer(chunk)
    ? Buffer.byteLength(chunk, encoding)
    : chunk.length
}
function shouldCompress(req, res) {
  var type = res.getHeader('Content-Type')
  if (type === undefined || !compressible(type)) {
    debug('%s not compressible', type)
    return false
  }
  return true
}
function shouldTransform(req, res) {
  var cacheControl = res.getHeader('Cache-Control')
  return !cacheControl || !cacheControlNoTransformRegExp.test(cacheControl)
}
function toBuffer(chunk, encoding) {
  return !Buffer.isBuffer(chunk) ? Buffer.from(chunk, encoding) : chunk
}