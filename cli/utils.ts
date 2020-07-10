

import { compile } from '../compiler';

import fs from 'fs';
import path from 'path';
// import { versions } from 'process';

export const version = require('../package.json').version;

export const basePath = process.cwd();

export function resolveFilePath(file: string) {
  return path.resolve(basePath, file);
}

export function readFile(file: string) {
  return fs.readFileSync(resolveFilePath(file), 'utf8');
}

export function compileFile(file: string) {
  return compile(readFile(file));
}