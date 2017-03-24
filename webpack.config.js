const { resolve } = require('path')
const webpack = require('webpack')


module.exports = {

  entry: resolve(__dirname, "lib", "index.ts"),

  output: {
    path: resolve(__dirname, "dist"),
    filename: "tvs-renderer.js",
    library: 'tvsRenderer',
    libraryTarget: "umd"
  },

  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        compilerOptions: {
          "outDir": "",
          "declaration": false
        }
      }
    }]
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      resolve(__dirname, 'lib'),
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: true
    })
  ]
}
