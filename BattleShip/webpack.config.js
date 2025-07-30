const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans dist folder on rebuild
  },
  devServer: {
    static: "./dist", // Serve from dist
    hot: true, // Hot reloading
  },

  module: {
    rules: [
      // CSS Loader
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", { targets: "defaults" }]],
        },
      },
    ],
  },
  plugins: [
    // Auto-generates HTML and injects JS/CSS
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    // Extracts CSS into separate file
    new MiniCssExtractPlugin(),
  ],

  mode: "development", // Change to 'production' for minified output
};
