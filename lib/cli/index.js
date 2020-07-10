#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var compiler_1 = require("../compiler");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var version = require('../package.json').version;
var basePath = path_1.default.dirname(path_1.default.join(__filename, '../../'));
var fileName = process.argv[2];
var filePath = path_1.default.resolve(basePath, fileName);
var verbose = process.argv.indexOf('--verbose') >= 0;
var outputPath = process.argv.indexOf('--output') >= 0 ? process.argv[process.argv.indexOf('--output') + 1] : null;
console.log("======SIMON LANG=======");
console.log("version:", version);
console.log("");
console.log("");
console.log("COMPILING FILE:");
console.log(filePath);
var contents = fs_1.default.readFileSync(filePath, 'utf8');
if (verbose) {
    console.log("");
    console.log("WITH CONTENTS:");
    console.log(contents);
}
console.log("");
console.log("COMPILING...");
console.log("");
var compiled = compiler_1.compile(contents);
if (verbose || !outputPath) {
    console.log("COMPILER RESULT:");
    console.log(compiled);
}
if (outputPath) {
    var outputPathABS = path_1.default.join(basePath, outputPath);
    console.log("WRITING TO:");
    console.log(outputPathABS);
    try {
        fs_1.default.writeFileSync(outputPathABS, "/*\n  Written in simonlang v" + version + ".\n  Visit https://github.com/puresamari/simon for more information.\n*/\n\n" + compiled + '\n', 'utf8');
    }
    catch (err) {
        console.log('ERROR WHILE WRITING FILE');
        switch (err.code) {
            case 'ENOENT':
                console.log('No such file or directory', outputPathABS);
                break;
            default:
                console.log('Unknown error', err);
        }
    }
}
console.log("");
console.log("");
console.log("=======================");
// fs.readFileSync('foo.txt','utf8');
