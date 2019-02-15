const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const template = {
  template: path.resolve(__dirname, 'src/index.html'),
  title: 'Simple Weather App',
  favicon: path.resolve(__dirname, 'src/favicon.ico'),
};

module.exports = {
  devServer: {
    contentBase: './lib',
    hot: true,
  },
  mode: 'development',
  entry: [
    'event-source-polyfill',
    'webpack-hot-middleware/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src'),
  ],
  output: {
    filename: '[name]-[hash:5].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: {
          test: path.resolve(__dirname, 'node_modules'),
        },
        options: {
          babelrc: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(md|txt)$/,
        use: 'raw-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin(template),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
