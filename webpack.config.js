const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (env) => {
  const DEV_MODE = 'development';
  const mode = env?.mode || DEV_MODE;
  const PORT = env?.port || 3000;
  const isDev = mode === DEV_MODE;
  const isProd = !isDev;

  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'template.html')
    }),
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [{from: path.join(__dirname, 'src', 'static'), to: 'public'}]
    })
  ];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
      })
    );
  }

  return {
    mode,
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      filename: "[name].[contenthash].js",
      path: path.join(__dirname, 'build'),
      clean: true,
      assetModuleFilename: "images/[hash][ext][query]"
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)/i,
          type: "asset/resource"
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          exclude: /node_modules/,
        }
      ]
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev ? {
      port: PORT,
      open: true,
      historyApiFallback: true,
    } : undefined,
    optimization: {
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', {interlaced: true}],
                ['jpegtran', {progressive: true}],
                ['optipng', {optimizationLevel: 5}],
                ['svgo', {name: 'preset-default'}],
              ]
            }
          }
        })
      ]
    }
  }
};
