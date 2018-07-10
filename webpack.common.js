const path = require('path');
const ProvidePlugin = require('webpack').ProvidePlugin;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

module.exports = {
    entry: {
        vendor: ['jquery'],
        app: './src/index.js'
    },

    context: process.cwd(),

    module: {

        /**
         * check every file that has different extension
         * and give each of them a loader ( this allows every files beyond javascript)
         */
        rules: [

            // Transpile JS ES6 to Common JS 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: path.join(process.cwd(), './babelrc')
                }
            },

            // Before test loader we run linter
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        configFile: __dirname + '/.eslintrc'
                      },
                }
            },

            // CSS Transpile
            {
                test: /\.css$/,
                use: [
                        {
                            loader: ExtractCssChunks.loader
                        },

                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true,
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                              config: {
                                path: __dirname + '/postcss.config.js'
                              }
                            },
                          },
                    ]
            },

            // SCSS Transpile
            {
                test: /\.scss$/,
                    use: [
                        {
                            loader: ExtractCssChunks.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                              config: {
                                path: __dirname + '/postcss.config.js'
                              }
                            },
                          },
                        {
                            loader: 'sass-loader'
                        }
                    ]
            },

            {
                test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: 'url-loader'
             }
        ]
    },

    plugins: [

        new ExtractCssChunks(
            {
              // Options similar to the same options in webpackOptions.output
              // both options are optional
              filename: "styles/[name].css",
            }
        ),

        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
        }),
    ],
    optimization: {

      },
    resolve: {
        extensions: ['.js', '.css']
    },
    output: {
        /**
         * Put Output bundled files to dist/
         * and give the name according to the name of the entry earlier
         */
        path: path.resolve(__dirname, 'dist'),
        filename : 'scripts/app.js',
    }
}
