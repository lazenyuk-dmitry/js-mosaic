const VueLoaderPlugin = require('vue-loader/lib/plugin');

const path = require('path');

const environment = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: environment,
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: 'assets',
    }]),
  ],
};
