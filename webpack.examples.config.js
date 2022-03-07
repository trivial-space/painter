const { resolve } = require('path')

module.exports = {
	mode: 'development',

	entry: {
		basic: ['./basic/main.ts'],
		'stackgl-cube': ['./stackgl-cube/main.ts'],
		instances: ['./instances/main.ts'],
		asset: ['./asset/main.ts'],
		shader: ['./shader/main.ts'],
		deferred_rendering: ['./deferred_rendering/main.ts'],
		effect_stack: ['./effect_stack/main.ts'],
		'uniform-function': ['./uniform-function/main.ts'],
		'game-of-life': ['./game-of-life/main.ts'],
		'form-custom-layout': ['./form-custom-layout/main.ts'],
	},

	context: resolve(__dirname, 'examples'),

	output: {
		path: resolve(__dirname, 'examples'),
		publicPath: '/',
		filename: '[name]/build.js',
	},

	module: {
		rules: [
			{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
			{
				test: /\.(glsl|frag|vert)$/,
				type: 'asset/source',
				use: 'glslify-loader',
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.ts'],
	},

	devtool: 'eval-cheap-module-source-map',

	devServer: {
		hot: true,
		devMiddleware: {
			publicPath: '/',
			// match the output `publicPath`
		},

		// enable HMR on the server

		static: ['examples'],
		// match the output path
	},
}
