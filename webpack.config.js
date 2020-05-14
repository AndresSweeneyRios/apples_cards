/* eslint-disable camelcase */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const RobotstxtPlugin = require('robotstxt-webpack-plugin')

const {
    meta, 
    port,
    backendPort,
} = require('./config')

module.exports = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.pug',
        }),

        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
        
        new WebpackPwaManifest({
            name: meta.title,
            short_name: meta.title,
            start_url: '/',
            description: meta.description,
            background_color: meta.themeColor,
            crossorigin: 'use-credentials',
            // icons: [
            //     {
            //         src: path.resolve('src/assets/logo.png'),
            //         sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            //     },
            //     {
            //         src: path.resolve('src/assets/large-icon.png'),
            //         size: '1024x1024', // you can also use the specifications pattern
            //     },
            //     {
            //         src: path.resolve('src/assets/maskable-icon.png'),
            //         size: '1024x1024',
            //         purpose: 'maskable',
            //     },
            // ],
        }),

        new RobotstxtPlugin({
            userAgent: "*",
            allow: "/",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/,
                        use: ['pug-plain-loader'],
                    },
                    {
                        use: ['pug-loader'],
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'css-loader',
                ],
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                            
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentedSyntax: true,
                                includePaths: [path.resolve(__dirname, 'src')],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            // TODO: svg loader
        ],
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'config': path.resolve(__dirname, 'config.js'),
            'sass': path.resolve(__dirname, 'src', 'sass'),
            'assets': path.resolve(__dirname, 'src', 'assets'),
        },
        extensions: ['.js'],
    },

    entry: {
        app: './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js",
    },

    devServer: {
        port,
        host: '0.0.0.0',
        historyApiFallback: true,
        proxy: {
            '/api': `http://localhost:${backendPort}`,
        },
    },
})
