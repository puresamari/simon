"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = void 0;
var commander_1 = require("commander");
var chalk = require('chalk');
var log = console.log;
function make() {
    var heat = new commander_1.Command('run');
    heat.command('file <path>', { isDefault: true })
        .action(function (path) { return log(chalk.yellow('Running', path)); });
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
