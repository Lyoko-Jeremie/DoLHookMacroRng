// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const fs = require('fs');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// const ZipPlugin = require('zip-webpack-plugin');

const webpack = require('webpack');

const config = {
  entry: {
    // Your entry file
    webpack_inject_early: './src_inject/inject_early.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  target: 'web',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'src_inject/tsconfig.json',
        memoryLimit: 4096,
      },
    }),

  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    plugins: [new TsconfigPathsPlugin({
      configFile: 'src_inject/tsconfig.json',
    })],
    alias: {
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';


  } else {
    config.mode = 'development';
  }
  return config;
};
