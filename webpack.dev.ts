import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';

import common from './webpack.common';

interface DevConfig extends Configuration {
  devServer: DevServerConfiguration;
}

const config: DevConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};

export default merge<Configuration>(common(true), config);
