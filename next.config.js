require('dotenv').config()
const withSize = require('next-size') 
const withCSS = require('@zeit/next-css')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const dev = process.env.NODE_ENV !== 'production'
const nextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: dev ? '[local]___[hash:base64:5]' : '[hash:base64:5]',
  },
  env: {
    API_URL: process.env.API_URL,
  },
  webpack: config => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/,
          },
        ],
      }),
    )
    return config
  },
}
module.exports = withSize(withCSS(nextConfig))
