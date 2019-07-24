const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');
const path = require('path');

module.exports = merge(webpackBaseConfig, {
    devtool: 'inline-source-map',
    devServer: {
        compress: true,
        port: 9000,
        hot: true,
        liveReload: false,
    }
});
