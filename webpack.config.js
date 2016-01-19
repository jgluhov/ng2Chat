/**
 * Created by jgluhov on 19/01/16.
 */
'use strict';

var webpack = require('webpack'),
  path = require('path');

var APP = __dirname + '/client';

module.exports = {
  context: APP,

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './src/app'
    ]
  },

  output: {
    path: APP + '/public',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  devtool: '#inline-source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};