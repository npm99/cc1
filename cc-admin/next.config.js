require('dotenv').config()

const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const withPWA = require('next-pwa')
const generateTheme = require('cc-next-dynamic-antd-theme/plugin')

const prefix = '/'
const path = require('path')


const withAntdTheme = generateTheme({
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './theme'),
  varFile: path.join(__dirname, './theme/vars.less'),
  mainLessFile: path.join(__dirname, './theme/main.less'),
  outputFilePath: path.join(__dirname, './.next/static/color.less')
})

const withAntd = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    onDemandEntries: {
      maxInactiveAge: 1000 * 60 * 60,
      pagesBufferLength: 5
    },
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    poweredByHeader: false,
    cssModules: true,
    cssLoaderOptions: {
      camelCase: true,
      localIdentName: '[local]___[hash:base64:5]',
      getLocalIdent: (context, localIdentName, localName, options) => {
        return localName
      }
    },
  })
}

module.exports = withPlugins([
  [withLess, {
    lessLoaderOptions: {}
  }],
  withAntd,
  withAntdTheme,
], {
  serverRuntimeConfig: {},
  publicRuntimeConfig: { prefix },
  assetPrefix: prefix,
  // experimental: {
  //   //largePageDataBytes: 128 * 1000, // 128KB by default
  //   largePageDataBytes: 128 * 100000,
  // },
  plugins: [
    new AntdDayjsWebpackPlugin()
  ],
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      console.log('Build with build id : ' + process.env.BUILD_ID)
      return process.env.BUILD_ID
    }
    return null
  }
})