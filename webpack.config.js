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
    Zone:['zone.js'],
    reflect: ['reflect-metadata'],
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './src/boot'
    ]
  },

  output: {
    path: APP + '/public',
    filename: '[name].js',
    library: '[name]'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    modulesDirectories: ['node_modules']
  },

  devtool: '#inline-source-map',

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
        query: {
          ignoreDiagnostics: [2403,2300,2374,2375,2420]
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: __dirname
  }
};