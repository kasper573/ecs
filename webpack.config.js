require("./scripts/env");
const path = require("path");
const WebpackShellPlugin = require("webpack-shell-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const fastRefresh = !!parseInt(process.env.USE_FAST_REFRESH);
const envToJsonFile = path.resolve(__dirname, "scripts/envToJson.sh");
const envRuntimeFile = path.resolve(__dirname, ".env.runtime");
const envOutputFile = path.resolve(
  process.cwd(),
  "public",
  `${path.basename(envRuntimeFile)}.json`
);

const isProd = process.env.NODE_ENV === "production";
const extensions = [".js", ".jsx", ".tsx", ".ts"];

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./src",
  devtool: "source-map",
  output: {
    filename: "[name].[hash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.[t|j]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            ...require("./babel.config"),
            plugins: [fastRefresh && "react-refresh/babel"].filter(Boolean),
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    fastRefresh && new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin({ extensions }),
    process.env.WEBPACK_BUILD_ENV_RUNTIME &&
      new WebpackShellPlugin({
        dev: true, // Always only build once
        safe: true,
        onBuildStart: `${envToJsonFile} ${envRuntimeFile} ${envOutputFile}`,
      }),
    process.env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin(),
    new NodePolyfillPlugin(),
    new HTMLWebpackPlugin({ title: "ECS" }),
    new CopyPlugin({
      patterns: [{ from: envOutputFile, to: "." }],
    }),
  ].filter(Boolean),
  resolve: {
    extensions,
  },
  devServer: {
    hotOnly: fastRefresh,
    port: process.env.WEBPACK_DEV_SERVER_PORT,
    historyApiFallback: true,
  },
};
