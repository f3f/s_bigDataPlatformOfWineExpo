/**
 * Created by Molay on 16/7/30.
 */
var webpack = require("webpack");

module.exports = {
    entry: {
        "main.min": "./src/main.js"
    },
    output: {
        path: "./dist/js/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.json$/i, loader: 'json'},
            {test: /\.html$/i, loader: 'raw'},
            {test: /\.css$/i, loader: 'style!css'}
        ]
    },
    plugins: [
        new webpack.BannerPlugin([
            'China International Wine Expo 2017',
            'Powered by Jusfoun Visualization Department',
            'Powered by Jusfoun FrontEnd Department',
            'Contact: ',
            '  vd@jusfoun.com',
            '  http://vd.jusfoun.com',
            '',
            'Copyright (c) ' + new Date().getFullYear() + ', Jusfoun Big Data Group Inc.',
            'All rights reserved.',
            '',
            'LICENSE',
            'http://www.jusfoun.com/software/LICENSE.txt'
        ].join('\n')),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};