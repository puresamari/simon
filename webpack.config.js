const { resolve, join } = require('path')
const pkg = require('./package.json')

const config = {
  devtool: 'eval',
  entry: resolve(__dirname, 'compiler/lib.ts'),
  output: {
    path: resolve(__dirname, 'lib'),
    filename: 'simonlang.js',
    libraryTarget: "umd",
    library: pkg.name
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
    ]
  }
}

module.exports = config