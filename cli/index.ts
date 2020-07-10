#!/usr/bin/env node

import { program } from 'commander';

import { VERSION } from './../compiler';
import { make as makeCompile } from './compile';
import { make as makeRun } from './run';
import { version } from './utils';


const chalk = require('chalk');
const log = console.log;

log(
  chalk.green(
    require('figlet').textSync('SIMONLANG', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    })
  ),
  '\n',
  chalk.yellow(
    'CLI Version', version, '\n',
    'COMPILER Version', VERSION, '\n'
  )
);

program
  .name('simonlang')
  .version(version)
  .option('--verbose', 'log verbose');

program.addCommand(makeCompile(), { isDefault: true });
program.addCommand(makeRun());

program.parse(process.argv);

export {};