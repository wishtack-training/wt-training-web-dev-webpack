/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

module.exports = {
  entry: path.join(srcPath, 'index.ts'),
  devServer: {
    contentBase: distPath
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(srcPath, 'index.html')
    })
  ],
  resolve: {
    extensions: ['.ts', '.mjs', '.js']
  }
};
