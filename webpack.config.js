const path = require('path');
const { IgnorePlugin } = require('webpack');
const {
  swcDefaultsFactory,
} = require('@nestjs/cli/lib/compiler/defaults/swc-defaults');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { PinoWebpackPlugin } = require('pino-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type { import('webpack').Configuration } */
module.exports = {
  devtool: 'source-map',
  entry: './src/main',

  externals: {},

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: {
          loader: 'swc-loader',
          options: swcDefaultsFactory().swcOptions,
        },
      },
      {
        loader: 'html-loader',
        test: /\.html$/i,
      },
    ],
  },

  node: {
    __dirname: false,
    __filename: false,
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/'),
  },

  plugins: [
    new IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@fastify/static',
          '@fastify/view',
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          '@nestjs/platform-express',
          '@nestjs/websockets/socket-module',
          'amqp-connection-manager',
          'amqplib',
          'cache-manager',
          'cache-manager/package.json',
          'class-transformer/storage',
          'hbs',
          'ioredis',
          'kafkajs',
          'mqtt',
          'nats',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, { paths: [process.cwd()] });
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: 'node_modules/bull/lib/commands',
          from: '**/*.lua',
        },
      ],
    }),
    new PinoWebpackPlugin({ transports: ['pino-pretty'] }),
  ],

  resolve: {
    extensions: ['.js', '.json', '.ts'],
    mainFields: ['main'],
    plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
  },
  target: 'node',
};
