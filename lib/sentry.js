const Sentry = require('@sentry/node')
const { SENTRY_DSN, NODE_ENV } = require('../config')
function withSentry({ release }) {
  const sentryOptions = {
    dsn: SENTRY_DSN,
    release,
    maxBreadcrumbs: 50,
    attachStacktrace: true,
  }
  if (NODE_ENV !== 'production') {
    const sentryTestkit = require('sentry-testkit') 
    const { sentryTransport } = sentryTestkit()
    sentryOptions.transport = sentryTransport
    sentryOptions.integrations = [
      new Sentry.Integrations.Debug({
        debugger: false,
      }),
    ]
  }
  Sentry.init(sentryOptions)
  return {
    Sentry,
    captureException: (err, { req, res, errorInfo, query, pathname }) => {
      Sentry.configureScope(scope => {
        if (err.message) {
          scope.setFingerprint([err.message])
        }
        if (err.statusCode) {
          scope.setExtra('statusCode', err.statusCode)
        }
        if (res && res.statusCode) {
          scope.setExtra('statusCode', res.statusCode)
        }
        if (process.browser) {
          scope.setTag('ssr', false)
          scope.setExtra('query', query)
          scope.setExtra('pathname', pathname)
        } else {
          scope.setTag('ssr', true)
          scope.setExtra('url', req.url)
          scope.setExtra('method', req.method)
          scope.setExtra('headers', req.headers)
          scope.setExtra('params', req.params)
          scope.setExtra('query', req.query)
        }
        if (errorInfo) {
          Object.keys(errorInfo).forEach(key =>
            scope.setExtra(key, errorInfo[key])
          )
        }
      })
      return Sentry.captureException(err)
    },
  }
}
module.exports = withSentry
