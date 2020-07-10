#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var compiler_1 = require("./../compiler");
var compile_1 = require("./compile");
var run_1 = require("./run");
var utils_1 = require("./utils");
var chalk = require('chalk');
var log = console.log;
log(chalk.green(require('figlet').textSync('SIMONLANG', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default',
})), '\n', chalk.yellow('CLI Version', utils_1.version, '\n', 'COMPILER Version', compiler_1.VERSION, '\n'));
commander_1.program
    .name('simonlang')
    .version(utils_1.version)
    .option('--verbose', 'log verbose');
commander_1.program.addCommand(compile_1.make(), { isDefault: true });
commander_1.program.addCommand(run_1.make());
commander_1.program.parse(process.argv);
