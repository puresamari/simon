"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = void 0;
const tslib_1 = require("tslib");
const commander_1 = require("commander");
const fs_1 = tslib_1.__importDefault(require("fs"));
const compiler_1 = require("./../compiler");
const utils_1 = require("./utils");
const chalk = require('chalk');
const log = console.log;
function make() {
    const heat = new commander_1.Command('compile');
    heat.command('file <path>', { isDefault: true })
        .option('-p, --print', 'print information')
        .option('-o, --output <path>', 'where should the file be compiled to')
        .action((path, options) => {
        log(chalk.yellow('Compiling', path));
        const compiled = utils_1.compileFile(path);
        if (options.print) {
            log(chalk.bold('Printing file', path), '\n');
            log(compiled, '\n');
        }
        if (options.output) {
            const outputPath = utils_1.resolveFilePath(options.output);
            try {
                fs_1.default.writeFileSync(outputPath, `/*\n  Written in simonlang v${compiler_1.VERSION}.\n  Visit https://github.com/puresamari/simon for more information.\n*/\n\n` + compiled + '\n', 'utf8');
            }
            catch (err) {
                console.log('ERROR WHILE WRITING FILE');
                switch (err.code) {
                    case 'ENOENT':
                        console.log('No such file or directory', outputPath);
                        break;
                    default:
                        console.log('Unknown error', err);
                }
            }
        }
    });
    return heat;
}
exports.make = make;
