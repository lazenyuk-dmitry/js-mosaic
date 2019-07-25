const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
