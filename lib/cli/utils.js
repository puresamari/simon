"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileFile = exports.readFile = exports.resolveFilePath = exports.basePath = exports.version = void 0;
const tslib_1 = require("tslib");
const compiler_1 = require("../compiler");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
// import { versions } from 'process';
exports.version = '0.0.1';
exports.basePath = process.cwd();
function resolveFilePath(file) {
    return path_1.default.resolve(exports.basePath, file);
}
exports.resolveFilePath = resolveFilePath;
function readFile(file) {
    return fs_1.default.readFileSync(resolveFilePath(file), 'utf8');
}
exports.readFile = readFile;
function compileFile(file) {
    return compiler_1.compile(readFile(file));
}
exports.compileFile = compileFile;
