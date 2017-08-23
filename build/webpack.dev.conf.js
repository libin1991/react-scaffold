const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./config')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const rootPath = path.resolve(__dirname, '..') // 项目根目录
const src = path.join(rootPath, 'src') // 开发源码目录

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {

  devtool: config.dev.cssSourceMap ? 'eval-source-map' : false,

  output: {
    path: config.dev.distPath,
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.dev.indexPath,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]

})