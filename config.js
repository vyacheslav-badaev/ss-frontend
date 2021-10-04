const getConfig = require('next/config')
const { publicRuntimeConfig } = getConfig.default()
const { SENTRY_DSN, NODE_ENV, API_URL } = publicRuntimeConfig
module.exports = {
  SENTRY_DSN,
  NODE_ENV,
  API_URL,
}
