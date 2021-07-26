const { resolve } = require('path')

module.exports = {
	mode: 'production',

	entry: resolve(__dirname, 'src', 'index.ts'),

	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'tvs-painter.js',
		library: 'tvsPainter',
		libraryTarget: 'umd',
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					compilerOptions: {
						outDir: '',
						declaration: false,
					},
				},
			},
		],
	},

	resolve: {
		extensions: ['.ts', '.js'],
		modules: ['node_modules'],
	},
}
