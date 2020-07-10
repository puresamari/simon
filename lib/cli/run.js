"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = void 0;
const commander_1 = require("commander");
const chalk = require('chalk');
const log = console.log;
function make() {
    const heat = new commander_1.Command('run');
    heat.command('file <path>', { isDefault: true })
        .action(path => log(chalk.yellow('Running', path)));
    // heat
    //   .command('jug')
    //   .action(() => {
    //     console.log('heat jug');
    //   });
    // heat
    //   .command('pot')
    //   .action(() => {
    //     console.log('heat pot');
    //   });
    return heat;
}
exports.make = make;
