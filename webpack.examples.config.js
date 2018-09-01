const { resolve } = require('path')
const webpack = require('webpack')


module.exports = {
	mode: 'development',

	entry: {
		'basic': ['./basic/main.ts'],
		'stackgl-cube': ['./stackgl-cube/main.ts'],
		'instances': ['./instances/main.ts'],
		'asset': ['./asset/main.ts'],
		'shader': ['./shader/main.ts'],
		'deferred_rendering': ['./deferred_rendering/main.ts'],
		'effect_stack': ['./effect_stack/main.ts'],
		'uniform-function': ['./uniform-function/main.ts']
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

	devtool: 'cheap-module-eval-source-map',

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
