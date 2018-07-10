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
        compress : true,
        open : true,
        openPage : 'pages/'
      },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
})