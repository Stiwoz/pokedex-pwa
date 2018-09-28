#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const chalk = require('chalk');

const envPath = '../config/env.prod.js';
const prefix = [chalk.gray("[Base Href Replacer]"), chalk.bold(chalk.green(":"))];

let envConfig;
try {
  envConfig = require(envPath)(global);
} catch (e) {
  console.log(chalk.bold(chalk.red(`Cannot open ${envPath} - Aborting Base Href Replacement`)));
  return;
}
const baseHref = JSON.parse(envConfig.env.BASE_HREF);

const indexPath = path.resolve(__dirname, '..', 'www', 'index.html');
const downloadPath = path.resolve(__dirname, '..', 'www', 'download.html');

const textReplace = file => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(...prefix, `Rewriting ${chalk.yellow(file)}`);
    const $ = cheerio.load(data);
    $('head base').attr('href', baseHref);
    fs.writeFile(file, $.html(), 'utf-8', err => {
      if (err) throw err;
    });
  });
};

textReplace(indexPath);
textReplace(downloadPath);