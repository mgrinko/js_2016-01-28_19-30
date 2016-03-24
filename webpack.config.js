'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: "./frontend/js/app.js",
  output: {
    path: __dirname + '/public',
    publicPath: '/public/',
    filename: "build.js"
  },

  watch: true,
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'frontend/js'),
        exclude: /(node_modules|bower_components)/,

        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.jade/,
        loader: 'jade'
      }
    ]
  },

  //plugins: [
  //  new webpack.optimize.UglifyJsPlugin({
  //    compress: {
  //      warnings: false
  //    }
  //  })
  //]
};