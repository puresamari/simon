import { Command } from 'commander';
import { compileFile, resolveFilePath, version } from './utils';

const chalk = require('chalk');
const log = console.log;

import fs from 'fs';
import path from 'path';

export function make() {
  const heat = new Command('compile');

  heat.command('file <path>', { isDefault: true })
    .option('-p, --print', 'print information')
    .option('-o, --output', 'where should the file be compiled to')
    .action((path, options: { print: boolean, output: string | null }) => {

      log(chalk.yellow('Compiling', path));

      const compiled = compileFile(path);

      if (options.print) {
        log(chalk.bold('Printing file', path), '\n');
        log(compiled, '\n');
      }

      if (options.output) {
        const outputPath = resolveFilePath(options.output);
        try {
            fs.writeFileSync(outputPath, `/*\n  Written in simonlang v${version}.\n  Visit https://github.com/puresamari/simon for more information.\n*/\n\n` + compiled + '\n', 'utf8');
        } catch (err) {
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