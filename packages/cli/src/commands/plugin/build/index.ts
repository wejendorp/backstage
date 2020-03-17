/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import chalk from 'chalk';
import webpack from 'webpack';
import { getPaths, Paths } from '../serve/paths';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

export default async () => {
  try {
    const config = createConfig(getPaths());
    webpack(config, (_, stats: webpack.Stats) => {
      //   process.stdout.write(error.message);
      process.stdout.write(stats.toString());
      process.stdout.write(`${chalk.blue('You genius!')}\n`);
    });
    process.stdout.write(`${chalk.blue('Build plugin')}\n`);
  } catch (error) {
    process.stderr.write(`${chalk.red(error.message)}\n`);
    process.exit(1);
  }
};

export function createConfig(paths: Paths): webpack.Configuration {
  return {
    mode: 'production',
    profile: false,
    bail: false,
    devtool: 'source-map',
    context: paths.appPath,
    entry: ['src/index.ts'],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new ModuleScopePlugin([paths.appSrc], [paths.appPackageJson])],
    },
    module: {
      rules: [
        {
          test: /\.(tsx?|jsx?|mjs)$/,
          enforce: 'pre',
          include: [paths.appSrc],
          use: {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        },
        {
          test: /\.(tsx?|jsx?|mjs)$/,
          include: [paths.appSrc],
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader',
          //   options: {
          //     // disable type checker - handled by ForkTsCheckerWebpackPlugin
          //     transpileOnly: true,
          //   },
        },
        {
          // TODO: how to let a plugin override this config if needed.
          test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          include: [paths.appSrc],
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.ya?ml$/,
          use: 'yml-loader',
        },
        {
          test: /\.(md)$/,
          use: 'raw-loader',
        },
        {
          test: /\.css$/i,
          include: [paths.appSrc],
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    // output: {
    //   publicPath: '/',
    //   filename: 'bundle.js',
    // },
    plugins: [
      new CleanWebpackPlugin(),
      //   new HtmlWebpackPlugin({
      //     template: paths.appHtml,
      //   }),
      //   new ForkTsCheckerWebpackPlugin({
      //     tsconfig: paths.appTsConfig,
      //     eslint: true,
      //     eslintOptions: {
      //       parserOptions: {
      //         project: paths.appTsConfig,
      //         tsconfigRootDir: paths.appPath,
      //       },
      //     },
      //     reportFiles: ['**', '!**/__tests__/**', '!**/?(*.)(spec|test).*'],
      //   }),
      //   new webpack.HotModuleReplacementPlugin(),
    ],
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
  };
}
