require('dotenv').config()
const webpack = require('webpack') 
const path = require('path')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack')
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
      new DotenvWebpackPlugin({
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
