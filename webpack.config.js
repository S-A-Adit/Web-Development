const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Entry point of your application
  entry: './src/index.js',

  // Output configuration
  output: {
    filename: '[name].[contenthash].js', // Adds cache-busting hash
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the dist folder before each build
  },

  // Development tools
  devtool: 'source-map', // Generates source maps for better debugging

  // Module rules
  module: {
    rules: [
      // CSS loader
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extracts CSS into separate files
          'css-loader', // Turns CSS into CommonJS
          'postcss-loader', // For post-processing (autoprefixer, etc.)
        ],
      },
      // HTML loader (optional - only needed if you import HTML files in JS)
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // Asset loader for images/fonts
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      },
    ],
  },

  // Plugins
  plugins: [
    // Generates an HTML file with all your bundles automatically injected
    new HtmlWebpackPlugin({
      template: './src/template.html', // Uses your custom template
      filename: 'index.html', // Output filename
      inject: 'body', // Where to inject the bundles
    }),
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],

  // Development server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true, // Automatically opens the browser
    hot: true, // Enable hot module replacement
  },

  // Mode (can be 'development' or 'production')
  mode: 'development',
};