const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/register");

const config = {
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
          test: /\.html$/,
          use: [
              {
                loader: 'html-loader',
                options: {
                    minimize: false
                }
            }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        template: './src/index.html'
    })
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    contentBase: __dirname + '/public',
    compress: true,
    port: 9000,
    open: true,
    stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false,
    }
  },
  watch: false,
  devtool: 'source-map',
};

module.exports = config;