/**
 * Created by jgluhov on 19/01/16.
 */
'use strict';

var webpack = require('webpack'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');

var APP = path.join(__dirname, 'client');

module.exports = {
  context: APP,

  entry: {
    Zone: ['zone.js'],
    reflect: ['reflect-metadata'],
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './src/boot'
    ]
  },

  output: {
    path: path.join(APP, 'public'),
    filename: '[name].js',
    library: '[name]'
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.css', '.html'],
    modulesDirectories: ['node_modules']
  },

  devtool: '#inline-source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
        query: {
          ignoreDiagnostics: [2403, 2300, 2374, 2375, 2420]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.(ttf|woff|woff2)/,
        loader: 'file'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css", {disable: process.env.NODE_ENV == 'development'}),
    new HtmlWebpackPlugin({template: 'client/src/templates/index.html', inject: false})
  ],

  devServer: {
    contentBase: __dirname
  }
};