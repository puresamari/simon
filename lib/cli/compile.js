"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = void 0;
var commander_1 = require("commander");
var fs_1 = __importDefault(require("fs"));
var compiler_1 = require("./../compiler");
var utils_1 = require("./utils");
var chalk = require('chalk');
var log = console.log;
function make() {
    var heat = new commander_1.Command('compile');
    heat.command('file <path>', { isDefault: true })
        .option('-p, --print', 'print information')
        .option('-o, --output', 'where should the file be compiled to')
        .action(function (path, options) {
        log(chalk.yellow('Compiling', path));
        var compiled = utils_1.compileFile(path);
        if (options.print) {
            log(chalk.bold('Printing file', path), '\n');
            log(compiled, '\n');
        }
        if (options.output) {
            var outputPath = utils_1.resolveFilePath(options.output);
            try {
                fs_1.default.writeFileSync(outputPath, "/*\n  Written in simonlang v" + compiler_1.VERSION + ".\n  Visit https://github.com/puresamari/simon for more information.\n*/\n\n" + compiled + '\n', 'utf8');
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
