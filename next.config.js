require('dotenv').config()
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  webpack: config => {
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
      })
    )
    return config
  },
}
module.exports = nextConfig
