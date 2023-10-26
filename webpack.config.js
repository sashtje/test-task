const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        }
      ]
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev ? {
      port: PORT,
      open: true,
      historyApiFallback: true,
      hot: true,
    } : undefined,
  }
};
