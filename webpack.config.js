const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
const extensions = [".js", ".jsx", ".tsx", ".ts"];

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src",
  devtool: "source-map",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.[t|j]sx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    isDevelopment && new ForkTsCheckerWebpackPlugin(),
    isDevelopment && new ESLintWebpackPlugin({ extensions }),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ].filter(Boolean),
  resolve: {
    extensions,
  },
  devServer: {
    hot: true,
  },
};
