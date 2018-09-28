#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const revHash = require('rev-hash');
const chalk = require('chalk');

const prefix = [chalk.gray("[Cache Buster]"), chalk.bold(chalk.green(":"))];

/**
 *
 * @param string fileName
 * @returns string
 */
const hashFile = file => {
  const buildDir = path.join(__dirname, '..', 'www', 'build');
  // Get file name
  const fileName = file.replace(/\.[^/.]+$/, "");
  // Get file extension
  const re = /(?:\.([^.]+))?$/;
  const fileExtension = re.exec(file)[1];

  const filePath = path.join(buildDir, file);
  const fileHash = revHash(fs.readFileSync(filePath));
  const fileNewName = `${fileName}.${fileHash}.${fileExtension}`;
  const fileNewPath = path.join(buildDir, fileNewName);
  const fileNewRelativePath = path.join('build', fileNewName);
  //Rename file
  console.log(...prefix, `Renaming ${chalk.yellow(filePath)} to ${chalk.yellow(fileNewPath)}`);
  fs.renameSync(filePath, fileNewPath);

  return fileNewRelativePath;
};


const indexPath = path.join(__dirname, '..', 'www', 'index.html');
let $ = cheerio.load(fs.readFileSync(indexPath, 'utf-8'));

const hashCss = hashFile('main.css');
const hashMainJs = hashFile('main.js');
const hashPolyJs = hashFile('polyfills.js');
const hashVendorJs = hashFile('vendor.js');

console.log(...prefix, `Rewriting ${chalk.yellow(indexPath)}`);
$('head link[href="build/main.css"]').attr('href', hashCss);
$('body script[src="build/main.js"]').attr('src', hashMainJs);
$('body script[src="build/polyfills.js"]').attr('src', hashPolyJs);
$('body script[src="build/vendor.js"]').attr('src', hashVendorJs);
fs.writeFileSync(indexPath, $.html());

const downloadPath = path.join(__dirname, '..', 'www', 'download.html');
console.log(...prefix, `Rewriting ${chalk.yellow(downloadPath)}`);
$ = cheerio.load(fs.readFileSync(downloadPath, 'utf-8'));
$('head link[href="build/main.css"]').attr('href', hashCss);
fs.writeFileSync(downloadPath, $.html());

const swPath = path.join(__dirname, '..', 'www', 'service-worker.js');
console.log(...prefix, `Rewriting ${chalk.yellow(swPath)}`);
fs.readFile(swPath, 'utf8', (err, data) => {
  if (err) throw err;
  let result = data.replace(/build\/main.css/g, hashCss);
  result = result.replace(/build\/main.js/g, hashMainJs);
  result = result.replace(/build\/polyfills.js/g, hashPolyJs);
  result = result.replace(/build\/vendor.js/g, hashVendorJs);

  fs.writeFile(swPath, result, 'utf8', err => {
    if (err) throw err;
  });
});