const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const prefix = [chalk.gray("[Config]"), chalk.bold(chalk.green(":"))];
const env = process.env.IONIC_ENV;

let env_config;
try {
  env_config = require('./env.' + env + '.js')(global);
} catch (e) {
  console.log(chalk.bold(chalk.red('Variabili di environment non trovate in ./config/ !')));
  console.log(chalk.yellow('Fallback su config di default'));
  return;
}
const isTest = env == 'dev';
const isProd = env == 'prod';
console.log(...prefix, 'Environment:', chalk.yellow(env));
console.log(...prefix, 'Env file loaded:', chalk.green('./config/env.' + env + '.js'));

// Type of sourcemap to use per build type
// useDefaultConfig[env].devtool = env_config.devtool;
// add debug messages
// useDefaultConfig[env].debug = env_config.debug;

useDefaultConfig[env].output.publicPath = env_config.env.BASE_HREF;

useDefaultConfig[env].plugins.push(
  new webpack.DefinePlugin({
    // Environment helpers
    ENV: env_config.env,
    'process.env.NODE_ENV': env_config['process.env.NODE_ENV'],
    // Needs to be set for zone.js so it does not throw an exception in IE11 while being in developer tools
    // https://github.com/angular/zone.js/issues/933
    'zoneEnableCrossContextCheck': isTest ? 'true' : 'false'
  }),
  new CopyWebpackPlugin([{
    from: './src/.htaccess',
    to: '../.htaccess',
    toType: 'file'
  }])
);

module.exports = function() {
  return useDefaultConfig;
};