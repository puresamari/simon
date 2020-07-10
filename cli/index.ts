#!/usr/bin/env node

const chalk = require('chalk');
const log = console.log;

import { program } from 'commander';
import { make as makeCompile } from './compile';
import { make as makeRun } from './run';
import { version } from './utils';

log(
  chalk.green(
    require('figlet').textSync('SIMONLANG', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    }), 'v' + version
  )
);

program
  .name('simonlang')
  .version(version)
  .option('--verbose', 'log verbose');

program.addCommand(makeCompile(), { isDefault: true });
program.addCommand(makeRun());

program.parse(process.argv);