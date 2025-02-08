import { Configuration, container } from 'webpack';
import { merge } from 'webpack-merge';

import config from '../webpack.config';

const { ModuleFederationPlugin } = container;

const federationConfig: Configuration = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      filename: 'remoteEntry.js',
      remotes: {
        otherApp: 'otherApp@http://localhost:3001/remoteEntry.js',
      },
      exposes: {
        './Button': './src/components/Button',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
};

export default merge<Configuration>(config(false), federationConfig);
