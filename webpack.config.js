var path = require('path'),
    webpack = require('webpack')


module.exports = {

  entry: path.resolve(__dirname, "./lib/renderer"),

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "tvs-renderer.js",
    library: 'tvsRenderer',
    libraryTarget: "umd"
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.json', '.ts', '.tsx', '.js'],
    root: [
      path.resolve(__dirname, "./lib")
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: true
    })
  ]
}
