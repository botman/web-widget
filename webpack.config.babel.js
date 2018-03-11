const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV!=='production';

module.exports = {
	context: path.resolve(__dirname, "src"),
    entry: {
        widget: './widget/index.tsx',
        chat: './chat/index.tsx'
    },

	output: {
		path: path.resolve(__dirname, "build/js"),
		publicPath: '/',
		filename: '[name].js'
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.less'],
		modules: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			typings: path.resolve(__dirname, "src/typings"),
			components: path.resolve(__dirname, "src/components"),    // used for tests
			style: path.resolve(__dirname, "src/style"),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{ test: /\.tsx?$/, use: { loader: 'awesome-typescript-loader' } },
			{
				// Transform our own .(less|css) files with PostCSS and CSS-modules
				test: /\.(less|css)$/,
				include: [path.resolve(__dirname, 'src/components')],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: { modules: true, sourceMap: CSS_MAPS, importLoaders: 1, minimize: true }
						},
						{
							loader: `postcss-loader`,
							options: {
								sourceMap: CSS_MAPS,
								plugins: () => {
									autoprefixer({ browsers: [ 'last 2 versions' ] });
								}
							}
						},
						{
							loader: 'less-loader',
							options: { sourceMap: CSS_MAPS }
						}
					]
				})
			},
			{
				test: /\.(less|css)$/,
				exclude: [path.resolve(__dirname, 'src/components')],
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: { sourceMap: CSS_MAPS, importLoaders: 1, minimize: true }
						},
						{
							loader: `postcss-loader`,
							options: {
								sourceMap: CSS_MAPS,
								plugins: () => {
									autoprefixer({ browsers: [ 'last 2 versions' ] });
								}
							}
						},
						{
							loader: 'less-loader',
							options: { sourceMap: CSS_MAPS }
						}
					]
				})
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: ENV==='production' ? 'file-loader' : 'url-loader'
			}
		]
	},
	plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
        new CopyWebpackPlugin([
            { from: './chat.html', to: './../' },
            { from: './demo.html', to: './../' }
        ])
	]).concat(ENV==='production' ? [
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				unsafe_comps: true,
				properties: true,
				keep_fargs: false,
				pure_getters: true,
				collapse_vars: true,
				unsafe: true,
				warnings: false,
				screw_ie8: true,
				sequences: true,
				dead_code: true,
				drop_debugger: true,
				comparisons: true,
				conditionals: true,
				evaluate: true,
				booleans: true,
				loops: true,
				unused: true,
				hoist_funs: true,
				if_return: true,
				join_vars: true,
				cascade: true,
				drop_console: true
			}
		})
	] : []),

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},

	devtool: ENV==='production' ? 'source-map' : 'cheap-module-eval-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/js/',
		contentBase: './src',
		historyApiFallback: true,
		open: true,
		openPage: 'demo.html',
	}
};
