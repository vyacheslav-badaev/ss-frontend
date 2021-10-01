require('dotenv').config()
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const withCSS = require('@zeit/next-css')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack') 
const withSourceMaps = require('@zeit/next-source-maps')()
module.exports = withSourceMaps(
  withCSS({
    publicRuntimeConfig: {
      SENTRY_DSN: process.env.SENTRY_DSN,
      NODE_ENV: process.env.NODE_ENV,
    },
    webpack: (config, { defaultLoaders, dev, isServer, buildId }) => {
      const jsRule = config.module.rules.findIndex(loader =>
        loader.test.test('test.jsx')
      )
      config.module.rules[jsRule].use = [
        defaultLoaders.babel,
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: dev,
          },
        },
      ]
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
)
