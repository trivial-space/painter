var path = require('path'),
    webpack = require('webpack')


module.exports = {

  entry: path.resolve(__dirname, "./lib/index.js"),

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "tvs-renderer.js",
    library: 'tvsRenderer',
    libraryTarget: "umd"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.json', '.js'],
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
