require('dotenv').config()
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack') 
const withSourceMaps = require('@zeit/next-source-maps')()
module.exports = withSourceMaps({
  publicRuntimeConfig: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
  },
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/,
          },
        ],
      }),
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
      })
    )
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }
    return config
  },
})
