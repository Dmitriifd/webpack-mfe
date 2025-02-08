import { Configuration, container } from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common';

const { ModuleFederationPlugin } = container;

export default merge<Configuration>(common(false), {
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
} as Configuration);
