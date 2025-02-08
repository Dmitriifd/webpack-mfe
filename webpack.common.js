const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const getStyleLoaders = (cssOptions, isDevelopment) => {
  const loaders = [
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    'sass-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [['autoprefixer']],
        },
      },
    },
  ];
  return loaders;
};

module.exports = (isDevelopment) => ({
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.module\.s?(css|scss)$/,
        use: getStyleLoaders({ modules: true }, isDevelopment),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getStyleLoaders({}, isDevelopment),
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              exportType: 'default',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    ...(isDevelopment
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
          }),
        ]),
    new Dotenv(),
  ],
});
