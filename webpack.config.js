const { resolve } = require('path')
const webpack = require('webpack')

const hotCodeEntry = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
]

module.exports = {
  entry: {
    'basic': [...hotCodeEntry, './basic/main.ts'],
    'minimal-own-canvas': [...hotCodeEntry, './minimal-own-canvas/main.ts'],
    'rotaion': [...hotCodeEntry, './rotation/main.ts'],
    'stackgl-cube': [...hotCodeEntry, './stackgl-cube/main.ts'],
    'update-order': [...hotCodeEntry, './update-order/main.ts']
  },

  context: resolve(__dirname, 'src'),

  output: {
    path: resolve(__dirname, 'examples'),
    publicPath: '/',
    filename: '[name]/build.js',
    hotUpdateChunkFilename: "[id].[hash].hot-update.js",
    hotUpdateMainFilename: "[hash].hot-update.json"
  },

  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, use: ['raw-loader', 'glslify-loader'], exclude: /node_modules/ },
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      resolve(__dirname, 'lib'),
    ],
    extensions: ['.ts', '.js']
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'public'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
}


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
