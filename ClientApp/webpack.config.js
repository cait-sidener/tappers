const purgecss = require('@fullhuman/postcss-purgecss')({
	content: ['./src/**/*.html', './src/**/*.component.ts'],
	defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = (config, options) => {
	console.log(`Using '${config.mode}' mode`);
	config.module.rules.push({
		test: /\.scss$/,
		loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			syntax: 'postcss-scss',
			plugins: () => [
				require('postcss-import'),
				require('tailwindcss'),
				require('autoprefixer'),
				...(config.mode === 'production' ? [purgecss] : [])
			]
		}
	});
	return config;
};
