import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration, RuleSetRule } from 'webpack';

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  public: path.resolve(__dirname, 'public'),
} as const;

const cssLoaderOptions = (isDevelopment: boolean) => ({
  importLoaders: 3,
  modules: {
    localIdentName: isDevelopment ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
  },
});

const getStyleRules = (isDevelopment: boolean): RuleSetRule[] => [
  {
    test: /\.module\.scss$/,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      { loader: 'css-loader', options: cssLoaderOptions(isDevelopment) },
      'postcss-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.scss$/,
    exclude: /\.module\.scss$/,
    use: [
      isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      { loader: 'css-loader', options: { importLoaders: 3 } },
      'postcss-loader',
      'sass-loader',
    ],
  },
];

const getAssetRules = (): RuleSetRule[] => [
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
    use: [{ loader: '@svgr/webpack', options: { typescript: true, exportType: 'default' } }],
  },
];

const getJavaScriptRules = (): RuleSetRule[] => [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
];

const config = (isDevelopment: boolean): Configuration => ({
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: PATHS.dist,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': PATHS.src,
      '@components': path.join(PATHS.src, 'components'),
      '@styles': path.join(PATHS.src, 'styles'),
      '@utils': path.join(PATHS.src, 'utils'),
    },
  },
  module: {
    rules: [...getJavaScriptRules(), ...getStyleRules(isDevelopment), ...getAssetRules()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.public, 'index.html'),
    }),
    ...(isDevelopment ? [] : [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })]),
    new Dotenv(),
  ],
});

export default config;
