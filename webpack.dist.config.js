/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');

module.exports = {

	output: {
		publicPath: '/assets/',
		path: 'dist/assets/',
		filename: 'main.js'
	},

	debug: false,
	devtool: false,
	entry: './src/components/main.js',

	stats: {
		colors: true,
		reasons: false
	},

	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.NoErrorsPlugin()
	],

	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			'styles': __dirname + '/src/styles',
			'mixins': __dirname + '/src/mixins',
			'components': __dirname + '/src/components/',
			'stores': __dirname + '/src/stores/',
			'actions': __dirname + '/src/actions/'
		}
	},

	module: {
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			}, {
				test: /\.(png|jpg|woff|woff2)$/,
				loader: 'url-loader?limit=8192'
			},
			// the url-loader uses DataUrls.
			// the file-loader emits files.
			{test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
			{test: /\.ttf$/, loader: "file-loader"},
			{test: /\.eot$/, loader: "file-loader"},
			{test: /\.svg$/, loader: "file-loader"}
		]
	}
};
