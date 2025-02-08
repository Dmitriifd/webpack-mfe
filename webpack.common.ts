import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration } from 'webpack';

interface CSSOptions {
  importLoaders?: number;
  modules?:
    | boolean
    | {
        localIdentName: string;
      };
}

const getStyleLoaders = (cssOptions: CSSOptions, isDevelopment: boolean) => {
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

const config = (isDevelopment: boolean): Configuration => ({
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
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

export default config;
