const { resolve } = require('path')
const webpack = require('webpack')

const hotCodeEntry = [
	'webpack-dev-server/client?http://localhost:8081',
	'webpack/hot/only-dev-server'
]

module.exports = {
	mode: 'development',

	entry: {
		'basic': [...hotCodeEntry, './basic/main.ts'],
		'stackgl-cube': [...hotCodeEntry, './stackgl-cube/main.ts'],
		'instances': [...hotCodeEntry, './instances/main.ts'],
		'asset': [...hotCodeEntry, './asset/main.ts'],
		'shader': [...hotCodeEntry, './shader/main.ts'],
		'deferred_rendering': [...hotCodeEntry, './deferred_rendering/main.ts'],
		'effect_stack': [...hotCodeEntry, './effect_stack/main.ts']
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
	],
}
