require("./env");
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

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
    process.env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin(),
    new DefinePlugin(explicitEnvDefines()),
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

function explicitEnvDefines() {
  const defines = {};
  for (const key in process.env) {
    defines[`process.env.${key}`] = JSON.stringify(process.env[key]);
  }
  return defines;
}
