module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['import', '@typescript-eslint', 'prettier'],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
	],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	rules: {
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'import/order': ['warn', { alphabetize: { order: 'asc' } }],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'**/*.test.jsx',
					'**/*.test.ts',
					'**/*.test.tsx',
					'**/*.test.js',
					'**/*.spec.jsx',
					'**/*.spec.ts',
					'**/*.spec.tsx',
					'**/*.spec.js',
					'**/*.stories.jsx',
					'**/*.stories.ts',
					'**/*.stories.tsx',
					'**/*.stories.js',
				],
			},
		],

		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		// '@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-use-before-define': 'off',

		'no-unused-expressions': [
			'error',
			{ allowShortCircuit: true, allowTernary: true },
		],
		'no-plusplus': 'off',
		'no-restricted-syntax': 'off',
		'no-unused-vars': 'off',
		'no-console': 'warn',
		'no-underscore-dangle': 'off',
		'no-case-declarations': 'off',
		'no-param-reassign': 'off',
		'no-use-before-define': 'off',
		radix: 'off',
		'consistent-return': 'off',
		'guard-for-in': 'off',
	},
}
