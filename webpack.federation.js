const { ModuleFederationPlugin } = require('webpack').container;
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
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
});
