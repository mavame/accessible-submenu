const path = require('path')
const webpack = require('webpack');

const config = {
  entry: {
    'accessible-submenu': './src/index.js',
    'accessible-submenu.min': './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'AccessibleSubmenu',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              ['es2015', { modules: false }]
            ]
          }
        }
      }
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sourceMap: false,
      compress: {
        warnings: false,
      },
    })
  ],
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    port: 9000,
  },
};

module.exports = config;