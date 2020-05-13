/* eslint-disable camelcase */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const RobotstxtPlugin = require('robotstxt-webpack-plugin')

const {
  meta, 
  development, 
} = { meta: {}, development: {} }//require('../config/index.ts').default

module.exports = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.pug',
    }),

    new VueLoaderPlugin(),

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
      //   {
      //     src: path.resolve('src/assets/logo.png'),
      //     sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      //   },
      //   {
      //     src: path.resolve('src/assets/large-icon.png'),
      //     size: '1024x1024', // you can also use the specifications pattern
      //   },
      //   {
      //     src: path.resolve('src/assets/maskable-icon.png'),
      //     size: '1024x1024',
      //     purpose: 'maskable',
      //   },
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
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true,
                includePaths: [path.resolve(__dirname, 'src', 'sass')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
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
        test: /\.svg$/,
        use: [
          'vue-svg-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
          loaders: {
            sass: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    indentedSyntax: true,
                    includePaths: [path.resolve(__dirname, 'src', 'sass')],
                  },
                },
              },
            ],
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'config': path.resolve(__dirname, '..', 'config', 'index.ts'),
      'css': path.resolve(__dirname, 'src', 'css'),
      'sass': path.resolve(__dirname, 'src', 'sass'),
      'assets': path.resolve(__dirname, 'src', 'assets'),
    },
    extensions: ['.tsx', '.ts', '.js', '.vue'],
  },

  entry: {
    app: './src/index.ts',
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist', 'client'),
    filename: "[name].bundle.js",
  },

  devServer: {
    port: development.frontendPort,
    host: '0.0.0.0',
    historyApiFallback: true,
    proxy: {
      '/api': `http://localhost:${development.backendPort}`,
    },
  },
})
