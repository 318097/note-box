const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/popup/script.js",
  watch: true,
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "app/build/popup"),
    filename: "script.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./app/popup/index.html" })]
};
