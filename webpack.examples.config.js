const { resolve } = require('path')
const webpack = require('webpack')

const hotCodeEntry = [
	'webpack-dev-server/client?http://localhost:8081',
	'webpack/hot/only-dev-server'
]

module.exports = {
	entry: {
		// 'basic': [...hotCodeEntry, './basic/main.ts'],
		// 'rotation': [...hotCodeEntry, './rotation/main.ts'],
		'stackgl-cube': [...hotCodeEntry, './stackgl-cube/main.ts'],
		'instances': [...hotCodeEntry, './instances/main.ts'],
		// 'update-order': [...hotCodeEntry, './update-order/main.ts'],
		// 'shader': [...hotCodeEntry, './shader/main.ts']
	},

	context: resolve(__dirname, 'examples'),

	output: {
		path: resolve(__dirname, 'examples'),
		publicPath: '/',
		filename: '[name]/build.js',
		hotUpdateChunkFilename: "[id].[hash].hot-update.js",
		hotUpdateMainFilename: "[hash].hot-update.json"
	},

	module: {
		rules: [
			{ test: /\.js$/, use: [{ loader: 'babel-loader', options: { presets: ['es2015'] } }], exclude: /node_modules/ },
			{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
			{ test: /\.(glsl|frag|vert)$/, use: ['raw-loader', 'glslify-loader'], exclude: /node_modules/ },
		]
	},

	resolve: {
		modules: [
			'node_modules'
		],
		extensions: ['.js', '.ts']
	},

	devtool: 'inline-source-map',

	devServer: {
		hot: true,
		// enable HMR on the server

		contentBase: resolve(__dirname, 'examples'),
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
