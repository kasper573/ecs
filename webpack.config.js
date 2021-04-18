require("./env");
const path = require("path");
const WebpackShellPlugin = require("webpack-shell-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const envToJsonFile = path.resolve(__dirname, "envToJson.sh");
const envRuntimeFile = path.resolve(__dirname, ".env.runtime");
const isProd = process.env.NODE_ENV === "production";
const extensions = [".js", ".jsx", ".tsx", ".ts"];

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./src",
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    publicPath: "/",
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
    !isProd && new ReactRefreshPlugin(),
    !isProd && new ForkTsCheckerWebpackPlugin(),
    !isProd && new ESLintWebpackPlugin({ extensions }),
    // No need to run the shell script in prod since Dockerfile.web already runs it
    !isProd &&
      new WebpackShellPlugin({
        dev: !isProd,
        onBuildStart: `${envToJsonFile} ${envRuntimeFile} ./public/${path.basename(
          envRuntimeFile
        )}.json`,
      }),
    process.env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin(),
    new NodePolyfillPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./public", to: "." },
        { from: "./public/index.html", to: "./200.html" },
      ],
    }),
  ].filter(Boolean),
  resolve: {
    extensions,
  },
  devServer: {
    hot: !isProd,
    port: process.env.WEBPACK_DEV_SERVER_PORT,
    historyApiFallback: true,
  },
};
