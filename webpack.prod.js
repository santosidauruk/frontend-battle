const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// GET Setup for Common Config
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false
                    }
                }
            }),

            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                canPrint: true
              })          
        ],

        runtimeChunk: false,

        splitChunks: {
            cacheGroups: {
              default: false,
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor_app',
                chunks: 'all',
                minChunks: 2
              }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          },
        }),
                /**
         *  Clean folder distributions, 
         *  before webpack put all bundled to distributions folder 
         */
      ],
})