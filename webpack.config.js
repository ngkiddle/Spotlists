const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


const entryPath = path.resolve(__dirname, "src/index.js");
const outputPath = path.resolve(__dirname, "public");

module.exports = {
	entry: entryPath,
	output: {
		path: outputPath,
		filename: "bundle.js",
		hotUpdateChunkFilename: "hot/hot-update.js",
		hotUpdateMainFilename: "hot/hot-update.json"
	},
	plugins: [
		// new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({ classNames: "classnames" }),
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({ template: "src/index.html" })
	],
	resolve: {
		alias: {
			App: path.resolve(__dirname, "src/App/"),
			Components: path.resolve(__dirname, "src/Components/"),
			Routes: path.resolve(__dirname, "src/Routes/"),
			Util: path.resolve(__dirname, "src/Util/")
		}
	},
	devServer: {
		historyApiFallback: true,
		contentBase: outputPath,
		compress: true,
		// hotOnly: true
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				loader: "babel-loader",
				// options: { cacheDirectory: true }
			},

			{
				test: /\.s[ac]ss$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				exclude: /node_modules/,
				use: ["file-loader"],
			},
		]
	}
};
