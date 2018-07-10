const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path');

// GET Setup for Common Config
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    devServer : {
        contentBase : path.join(__dirname, ''),
        inline : true,
        stats : 'errors-only',
        // Enable GZIP Compression
        compress : true,
        // Enable HOT RELOAD when dev-server detect 
        hot: true,
        watchContentBase: true,
        open : true,
        openPage : 'pages/',
        quiet: true
      },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
})