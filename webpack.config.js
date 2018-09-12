'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    devServer: {
        contentBase: 'dist'
    },
    output: {
        filename: '[chunkhash].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js']
    }
};